export async function routeTool(input, { registry, context }) {
  const toolName = input.tool || input?.plan?.tool;
  const args = input.args || input?.plan?.args || {};
  const tool = registry[toolName];

  if (!tool) {
    return {
      ok: false,
      error: `Unknown tool: ${toolName}`,
      plan: input.plan || null
    };
  }

  try {
    const result = await tool(args, context);
    return {
      ok: true,
      tool: toolName,
      result,
      plan: input.plan || null
    };
  } catch (error) {
    return {
      ok: false,
      tool: toolName,
      error: error.message,
      plan: input.plan || null
    };
  }
}
