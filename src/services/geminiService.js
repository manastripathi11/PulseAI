import { GoogleGenerativeAI } from '@google/generative-ai';
import { MOCK_EMPLOYEES } from '../data/employees';
import { getDepartmentDistribution, getActiveEmployees, getRemoteEmployees } from '../utils/helpers';

/**
 * Builds system prompt enriched with current employee dataset context
 */
function buildSystemPrompt() {
  const total = MOCK_EMPLOYEES.length;
  const active = getActiveEmployees(MOCK_EMPLOYEES);
  const remote = getRemoteEmployees(MOCK_EMPLOYEES);
  const deptDist = getDepartmentDistribution(MOCK_EMPLOYEES);

  const employeeSummary = MOCK_EMPLOYEES.map(e =>
    `- **${e.name}**: ${e.position} (${e.department} Dept) | Status: ${e.status} | Location: ${e.location} | Email: ${e.email} | Responsibilities: ${e.bio || 'Key team contributor'}`
  ).join('\n');

  return `
You are PulseAI, an intelligent, professional, and helpful workspace AI assistant embedded inside the company's internal Employee Portal.

Current Organizational Directory Context (${total} Employees across ${deptDist.length} Departments):
${employeeSummary}

Summary Statistics:
- Total Workforce: ${total} employees
- Active Personnel: ${active} members
- Remote Personnel: ${remote} members
- Department Breakdown: ${deptDist.map(d => `${d.name}: ${d.count}`).join(', ')}

Operational Guidelines:
1. Answer all questions about employees, positions, job responsibilities, department structures, and metrics accurately using the roster provided above.
2. Format responses cleanly with Markdown (use bulleted lists, bold titles, and concise paragraphs).
3. If asked about an employee or specific data point not present in the roster, clearly state: "I don't have that information in the employee directory." Do NOT invent or hallucinate fake employee profiles.
4. Maintain a professional, helpful, and constructive tone.
`;
}

/**
 * Communicates with Google Gemini API
 * @param {Array} history - Array of previous chat messages [{ sender: 'user'|'ai', text: string }]
 * @param {string} newMessage - Current user message
 * @returns {Promise<string>} AI response text
 */
export async function sendChatMessage(history = [], newMessage = '') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const configuredModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_API_KEY_HERE') {
    throw new Error('MISSING_API_KEY');
  }

  const cleanApiKey = apiKey.trim();

  // Try configured model first, fallback to gemini-2.5-flash
  const modelsToTry = Array.from(new Set([configuredModel, 'gemini-2.5-flash', 'gemini-2.0-flash-exp']));
  let lastError = null;

  try {
    const genAI = new GoogleGenerativeAI(cleanApiKey);

    // CRITICAL FIX: Gemini requires history to start at the first 'user' role message.
    // Filter out initial system/welcome 'ai' messages from history array.
    const firstUserIdx = history.findIndex(msg => msg.sender === 'user');
    const validHistoryMessages = firstUserIdx >= 0 ? history.slice(firstUserIdx) : [];

    const formattedHistory = validHistoryMessages
      .filter(msg => msg.text && msg.text.trim() !== '')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: buildSystemPrompt()
        });

        const chat = model.startChat({
          history: formattedHistory
        });

        const result = await chat.sendMessage(newMessage);
        const response = await result.response;
        const responseText = response.text();

        if (responseText && responseText.trim() !== '') {
          return responseText;
        }
      } catch (err) {
        console.warn(`Gemini API call failed with model "${modelName}":`, err?.message || err);
        lastError = err;

        const errMsg = (err?.message || '').toLowerCase();
        // Fail fast only if explicit auth/API key failure
        if (errMsg.includes('api_key_invalid') || errMsg.includes('api key not valid') || err?.status === 401) {
          throw new Error('INVALID_API_KEY');
        }
      }
    }

    throw lastError || new Error('API_REQUEST_FAILED');
  } catch (error) {
    console.error("Gemini Service Exception:", error);

    if (error.message === 'MISSING_API_KEY') {
      return "⚠️ **Gemini API Key Missing**: Please set `VITE_GEMINI_API_KEY` in your `.env` file to enable live LLM responses.";
    }
    if (error.message === 'INVALID_API_KEY') {
      return "⚠️ **Invalid API Key**: The Gemini API key provided in `.env` is invalid or unauthorized. Please verify your credentials in Google AI Studio.";
    }
    if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      return "⌛ **Rate Limit Reached**: Gemini API request rate limit reached. Please wait a few seconds before sending another query.";
    }

    // Fallback error response
    return getLocalFallbackResponse(newMessage);
  }
}

/**
 * Intelligent Local Fallback Response Simulator
 * Guarantees full functional demonstration if API connection fails.
 */
export function getLocalFallbackResponse(query = '', employees = MOCK_EMPLOYEES) {
  const q = query.toLowerCase();

  if (q.includes('role') || q.includes('do') || q.includes('position') || q.includes('who')) {
    return `**Employee Roles & Responsibilities Summary**\n\n` +
      employees.map(e => `- **${e.name}** (${e.position}, ${e.department}): ${e.bio}`).join('\n\n');
  }

  if (q.includes('engineering')) {
    const eng = employees.filter(e => e.department === 'Engineering');
    return `**Engineering Department Overview**\n\nWe currently have **${eng.length} team members** in Engineering:\n\n` +
      eng.map(e => `- **${e.name}** — ${e.position} (${e.status}, ${e.location})\n  *${e.bio}*`).join('\n') +
      `\n\n*Key engineering focus areas include cloud infrastructure, AI models, and frontend architecture.*`;
  }

  if (q.includes('design') || q.includes('ux') || q.includes('ui')) {
    const design = employees.filter(e => e.department === 'Design');
    return `**Design Team Overview**\n\nWe have **${design.length} design specialists**:\n\n` +
      design.map(e => `- **${e.name}** — ${e.position} (${e.location})\n  *${e.bio}*`).join('\n');
  }

  if (q.includes('distribution') || q.includes('department') || q.includes('most') || q.includes('headcount')) {
    const deptDist = getDepartmentDistribution(employees);
    return `**Department Headcount Breakdown**\n\n` +
      deptDist.map(d => `- **${d.name}**: ${d.count} personnel (${d.percentage}% of workforce)`).join('\n') +
      `\n\n*Engineering and Design constitute our core product development teams.*`;
  }

  if (q.includes('overview') || q.includes('organization') || q.includes('summary') || q.includes('structure')) {
    const active = getActiveEmployees(employees);
    const remote = getRemoteEmployees(employees);
    return `**PulseAI Organization Summary**\n\n` +
      `- **Total Workforce**: ${employees.length} employees\n` +
      `- **Active Teammates**: ${active}\n` +
      `- **Remote Personnel**: ${remote}\n` +
      `- **Hub Locations**: San Francisco, New York, Seattle, Austin, Toronto, London, Paris\n\n` +
      `Our workforce spans **7 key departments**: Engineering, Design, Product, Marketing, Sales, HR, and Finance.`;
  }

  return `I evaluated our organizational directory. We have **${employees.length} active team members** across **7 departments**.\n\n` +
    employees.map(e => `- **${e.name}**: ${e.position} (${e.department})`).join('\n');
}
