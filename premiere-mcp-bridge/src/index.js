import { entrypoints } from 'uxp';
import { createRuntime } from './runtime.js';

const runtime = createRuntime();

function mount(rootNode) {
  rootNode.innerHTML = `
    <style>
      body { font-family: sans-serif; padding: 12px; background: #111; color: #eee; }
      input, button { width: 100%; margin: 8px 0; }
      pre { white-space: pre-wrap; background: #222; padding: 8px; border-radius: 6px; }
    </style>
    <h2>MCP Bridge</h2>
    <input id="prompt" placeholder="Haldi reel banao" />
    <button id="planBtn">Plan</button>
    <button id="runBtn">Run</button>
    <pre id="output">Ready</pre>
  `;

  const promptEl = rootNode.querySelector('#prompt');
  const outputEl = rootNode.querySelector('#output');

  rootNode.querySelector('#planBtn').addEventListener('click', () => {
    const plan = runtime.planner.plan(promptEl.value, {});
    outputEl.textContent = JSON.stringify(plan, null, 2);
  });

  rootNode.querySelector('#runBtn').addEventListener('click', async () => {
    const plan = runtime.planner.plan(promptEl.value, {});
    const result = await runtime.bridge.run(plan.tool, plan.args);
    outputEl.textContent = JSON.stringify(result, null, 2);
  });
}

entrypoints.setup({
  plugin: {
    create() {},
    destroy() {}
  },
  panels: {
    mcpBridgePanel: {
      create(rootNode) {
        mount(rootNode);
      },
      show(rootNode) {
        mount(rootNode);
      }
    }
  }
});
