import { parseStudyPlan, getAuthHeaders } from './helpers';

const API_BASE_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;


// Generate study plan
export async function generateStudyPlan(topic) {
  try {
    const studyPlanUrl = `${API_BASE_URL}`;
    const response = await fetch(studyPlanUrl, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ topic, operation: 'generate' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    // Extract data from n8n's nested structure
    let data;

    if (Array.isArray(rawData) && rawData.length > 0) {
      const firstItem = rawData[0];

      // Check if it has the nested OpenAI structure
      if (
        firstItem.output &&
        Array.isArray(firstItem.output) &&
        firstItem.output.length > 0
      ) {
        const output = firstItem.output[0];

        if (
          output.content &&
          Array.isArray(output.content) &&
          output.content.length > 0
        ) {
          const content = output.content[0];

          if (content.text) {
            data = content.text;
          }
        }
      }

      if (!data) {
        data = firstItem;
      }
    } else {
      data = rawData;
    }

    // Validate that we have the required fields
    if (!data || !data.summary || !data.steps) {
      throw new Error('Invalid response format from n8n');
    }

    // Convert steps to strings if they're objects
    let steps = data.steps;
    if (
      Array.isArray(steps) &&
      steps.length > 0 &&
      typeof steps[0] === 'object'
    ) {
      // Steps are objects, extract the text/string value
      steps = steps.map((stepObj) => {
        // Handle different possible formats
        if (typeof stepObj === 'string') return stepObj;
        if (stepObj.text) return stepObj.text;
        if (stepObj.step) return stepObj.step;
        if (stepObj.description) return stepObj.description;
        // If it's an object with multiple properties, try to extract meaningful text
        return (
          Object.values(stepObj).find(
            (val) => typeof val === 'string' && val.length > 10
          ) || JSON.stringify(stepObj)
        );
      });
    }

    // Convert resources to proper format if needed
    let resources = data.resources || [];
    if (
      Array.isArray(resources) &&
      resources.length > 0 &&
      typeof resources[0] === 'object'
    ) {
      resources = resources.map((res) => ({
        type: res.type || 'article',
        title: res.title || 'Resource',
        url: res.url || '#',
      }));
    }

    return {
      id: Date.now(),
      topic: data.topic || topic,
      summary: data.summary,
      steps: steps,
      resources: resources,
      difficulty: data.difficulty || 'beginner',
      timeline: data.timeline || '4 weeks',
      timestamp: new Date().toLocaleString(),
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Save study history
export async function saveStudyHistory(studyData) {
  try {
    const saveWebhookUrl = `${API_BASE_URL}`;

    const response = await fetch(saveWebhookUrl, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        id: studyData.id,
        topic: studyData.topic,
        summary: studyData.summary,
        steps: studyData.steps,
        resources: studyData.resources,
        difficulty: studyData.difficulty,
        timeline: studyData.timeline,
        timestamp: studyData.timestamp || new Date().toISOString(),
        operation: 'save',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json();

    return { success: true, message: 'Study plan saved successfully!' };
  } catch (error) {
    console.error('Save Error:', error);
    throw new Error('Failed to save study plan. Please try again.');
  }
}

// Get study history
export async function getStudyHistory() {
  try {
    const historyUrl = `${API_BASE_URL}`;

    const response = await fetch(historyUrl, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ operation: 'list' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let result = [];
    try {
      const text = await response.text();
      if (text) {
        result = JSON.parse(text);
      }
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
    }

    return result;
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

// Get study plan
export async function getStudyPlan(id) {
  try {
    const historyUrl = `${API_BASE_URL}`;

    const response = await fetch(historyUrl, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ operation: 'get_plan', id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    // Handle empty response
    if (!text || text.trim() === '') {
      return null;
    }

    const data = JSON.parse(text);

    // Handle array response
    if (Array.isArray(data) && data.length > 0) {
      return parseStudyPlan(data[0]);
    }

    return parseStudyPlan(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}

// Delete study plan
export async function deleteStudyplan(id) {
  try {
    const historyUrl = `${API_BASE_URL}`;

    const response = await fetch(historyUrl, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ id, operation: 'delete' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Fetch Error:', error);
    return false;
  }
}
