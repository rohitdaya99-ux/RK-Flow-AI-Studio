/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6445
(__unused_webpack_module, exports) {

var __webpack_unused_export__;


/**
 * Contains the list of OpenAPI data types
 * as defined by https://swagger.io/docs/specification/data-models/data-types/
 * @public
 */
exports.SchemaType = void 0;
(function (SchemaType) {
    /** String type. */
    SchemaType["STRING"] = "string";
    /** Number type. */
    SchemaType["NUMBER"] = "number";
    /** Integer type. */
    SchemaType["INTEGER"] = "integer";
    /** Boolean type. */
    SchemaType["BOOLEAN"] = "boolean";
    /** Array type. */
    SchemaType["ARRAY"] = "array";
    /** Object type. */
    SchemaType["OBJECT"] = "object";
})(exports.SchemaType || (exports.SchemaType = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @public
 */
exports.Kf = void 0;
(function (ExecutableCodeLanguage) {
    ExecutableCodeLanguage["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
    ExecutableCodeLanguage["PYTHON"] = "python";
})(exports.Kf || (exports.Kf = {}));
/**
 * Possible outcomes of code execution.
 * @public
 */
exports.Pi = void 0;
(function (Outcome) {
    /**
     * Unspecified status. This value should not be used.
     */
    Outcome["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
    /**
     * Code execution completed successfully.
     */
    Outcome["OUTCOME_OK"] = "outcome_ok";
    /**
     * Code execution finished but with a failure. `stderr` should contain the
     * reason.
     */
    Outcome["OUTCOME_FAILED"] = "outcome_failed";
    /**
     * Code execution ran for too long, and was cancelled. There may or may not
     * be a partial output present.
     */
    Outcome["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(exports.Pi || (exports.Pi = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Possible roles.
 * @public
 */
const POSSIBLE_ROLES = ["user", "model", "function", "system"];
/**
 * Harm categories that would cause prompts or candidates to be blocked.
 * @public
 */
exports.DE = void 0;
(function (HarmCategory) {
    HarmCategory["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
    HarmCategory["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
    HarmCategory["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
    HarmCategory["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
    HarmCategory["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
    HarmCategory["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(exports.DE || (exports.DE = {}));
/**
 * Threshold above which a prompt or candidate will be blocked.
 * @public
 */
exports.vk = void 0;
(function (HarmBlockThreshold) {
    /** Threshold is unspecified. */
    HarmBlockThreshold["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
    /** Content with NEGLIGIBLE will be allowed. */
    HarmBlockThreshold["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
    /** Content with NEGLIGIBLE and LOW will be allowed. */
    HarmBlockThreshold["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
    /** Content with NEGLIGIBLE, LOW, and MEDIUM will be allowed. */
    HarmBlockThreshold["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
    /** All content will be allowed. */
    HarmBlockThreshold["BLOCK_NONE"] = "BLOCK_NONE";
})(exports.vk || (exports.vk = {}));
/**
 * Probability that a prompt or candidate matches a harm category.
 * @public
 */
exports.uR = void 0;
(function (HarmProbability) {
    /** Probability is unspecified. */
    HarmProbability["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
    /** Content has a negligible chance of being unsafe. */
    HarmProbability["NEGLIGIBLE"] = "NEGLIGIBLE";
    /** Content has a low chance of being unsafe. */
    HarmProbability["LOW"] = "LOW";
    /** Content has a medium chance of being unsafe. */
    HarmProbability["MEDIUM"] = "MEDIUM";
    /** Content has a high chance of being unsafe. */
    HarmProbability["HIGH"] = "HIGH";
})(exports.uR || (exports.uR = {}));
/**
 * Reason that a prompt was blocked.
 * @public
 */
exports.Cr = void 0;
(function (BlockReason) {
    // A blocked reason was not specified.
    BlockReason["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
    // Content was blocked by safety settings.
    BlockReason["SAFETY"] = "SAFETY";
    // Content was blocked, but the reason is uncategorized.
    BlockReason["OTHER"] = "OTHER";
})(exports.Cr || (exports.Cr = {}));
/**
 * Reason that a candidate finished.
 * @public
 */
exports.eD = void 0;
(function (FinishReason) {
    // Default value. This value is unused.
    FinishReason["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
    // Natural stop point of the model or provided stop sequence.
    FinishReason["STOP"] = "STOP";
    // The maximum number of tokens as specified in the request was reached.
    FinishReason["MAX_TOKENS"] = "MAX_TOKENS";
    // The candidate content was flagged for safety reasons.
    FinishReason["SAFETY"] = "SAFETY";
    // The candidate content was flagged for recitation reasons.
    FinishReason["RECITATION"] = "RECITATION";
    // The candidate content was flagged for using an unsupported language.
    FinishReason["LANGUAGE"] = "LANGUAGE";
    // Token generation stopped because the content contains forbidden terms.
    FinishReason["BLOCKLIST"] = "BLOCKLIST";
    // Token generation stopped for potentially containing prohibited content.
    FinishReason["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
    // Token generation stopped because the content potentially contains Sensitive Personally Identifiable Information (SPII).
    FinishReason["SPII"] = "SPII";
    // The function call generated by the model is invalid.
    FinishReason["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
    // Unknown reason.
    FinishReason["OTHER"] = "OTHER";
})(exports.eD || (exports.eD = {}));
/**
 * Task type for embedding content.
 * @public
 */
exports.wP = void 0;
(function (TaskType) {
    TaskType["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
    TaskType["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
    TaskType["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
    TaskType["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
    TaskType["CLASSIFICATION"] = "CLASSIFICATION";
    TaskType["CLUSTERING"] = "CLUSTERING";
})(exports.wP || (exports.wP = {}));
/**
 * @public
 */
exports.FunctionCallingMode = void 0;
(function (FunctionCallingMode) {
    // Unspecified function calling mode. This value should not be used.
    FunctionCallingMode["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    // Default model behavior, model decides to predict either a function call
    // or a natural language repspose.
    FunctionCallingMode["AUTO"] = "AUTO";
    // Model is constrained to always predicting a function call only.
    // If "allowed_function_names" are set, the predicted function call will be
    // limited to any one of "allowed_function_names", else the predicted
    // function call will be any one of the provided "function_declarations".
    FunctionCallingMode["ANY"] = "ANY";
    // Model will not predict any function call. Model behavior is same as when
    // not passing any function declarations.
    FunctionCallingMode["NONE"] = "NONE";
})(exports.FunctionCallingMode || (exports.FunctionCallingMode = {}));
/**
 * The mode of the predictor to be used in dynamic retrieval.
 * @public
 */
exports.bh = void 0;
(function (DynamicRetrievalMode) {
    // Unspecified function calling mode. This value should not be used.
    DynamicRetrievalMode["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    // Run retrieval only when system decides it is necessary.
    DynamicRetrievalMode["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(exports.bh || (exports.bh = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Basic error type for this SDK.
 * @public
 */
class GoogleGenerativeAIError extends Error {
    constructor(message) {
        super(`[GoogleGenerativeAI Error]: ${message}`);
    }
}
/**
 * Errors in the contents of a response from the model. This includes parsing
 * errors, or responses including a safety block reason.
 * @public
 */
class GoogleGenerativeAIResponseError extends GoogleGenerativeAIError {
    constructor(message, response) {
        super(message);
        this.response = response;
    }
}
/**
 * Error class covering HTTP errors when calling the server. Includes HTTP
 * status, statusText, and optional details, if provided in the server response.
 * @public
 */
class GoogleGenerativeAIFetchError extends GoogleGenerativeAIError {
    constructor(message, status, statusText, errorDetails) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.errorDetails = errorDetails;
    }
}
/**
 * Errors in the contents of a request originating from user input.
 * @public
 */
class GoogleGenerativeAIRequestInputError extends GoogleGenerativeAIError {
}
/**
 * Error thrown when a request is aborted, either due to a timeout or
 * intentional cancellation by the user.
 * @public
 */
class GoogleGenerativeAIAbortError extends GoogleGenerativeAIError {
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
const DEFAULT_API_VERSION = "v1beta";
/**
 * We can't `require` package.json if this runs on web. We will use rollup to
 * swap in the version number here at build time.
 */
const PACKAGE_VERSION = "0.24.1";
const PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function (Task) {
    Task["GENERATE_CONTENT"] = "generateContent";
    Task["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
    Task["COUNT_TOKENS"] = "countTokens";
    Task["EMBED_CONTENT"] = "embedContent";
    Task["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
class RequestUrl {
    constructor(model, task, apiKey, stream, requestOptions) {
        this.model = model;
        this.task = task;
        this.apiKey = apiKey;
        this.stream = stream;
        this.requestOptions = requestOptions;
    }
    toString() {
        var _a, _b;
        const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
        const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
        let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
        if (this.stream) {
            url += "?alt=sse";
        }
        return url;
    }
}
/**
 * Simple, but may become more complex if we add more versions to log.
 */
function getClientHeaders(requestOptions) {
    const clientHeaders = [];
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
        clientHeaders.push(requestOptions.apiClient);
    }
    clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
    return clientHeaders.join(" ");
}
async function getHeaders(url) {
    var _a;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
    headers.append("x-goog-api-key", url.apiKey);
    let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
    if (customHeaders) {
        if (!(customHeaders instanceof Headers)) {
            try {
                customHeaders = new Headers(customHeaders);
            }
            catch (e) {
                throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
            }
        }
        for (const [headerName, headerValue] of customHeaders.entries()) {
            if (headerName === "x-goog-api-key") {
                throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
            }
            else if (headerName === "x-goog-api-client") {
                throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
            }
            headers.append(headerName, headerValue);
        }
    }
    return headers;
}
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
    const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
    return {
        url: url.toString(),
        fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body }),
    };
}
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, 
// Allows this to be stubbed for tests
fetchFn = fetch) {
    const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
    return makeRequest(url, fetchOptions, fetchFn);
}
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
    let response;
    try {
        response = await fetchFn(url, fetchOptions);
    }
    catch (e) {
        handleResponseError(e, url);
    }
    if (!response.ok) {
        await handleResponseNotOk(response, url);
    }
    return response;
}
function handleResponseError(e, url) {
    let err = e;
    if (err.name === "AbortError") {
        err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
    }
    else if (!(e instanceof GoogleGenerativeAIFetchError ||
        e instanceof GoogleGenerativeAIRequestInputError)) {
        err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
    }
    throw err;
}
async function handleResponseNotOk(response, url) {
    let message = "";
    let errorDetails;
    try {
        const json = await response.json();
        message = json.error.message;
        if (json.error.details) {
            message += ` ${JSON.stringify(json.error.details)}`;
            errorDetails = json.error.details;
        }
    }
    catch (e) {
        // ignored
    }
    throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
/**
 * Generates the request options to be passed to the fetch API.
 * @param requestOptions - The user-defined request options.
 * @returns The generated request options.
 */
function buildFetchOptions(requestOptions) {
    const fetchOptions = {};
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== undefined || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
        const controller = new AbortController();
        if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
            setTimeout(() => controller.abort(), requestOptions.timeout);
        }
        if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
            requestOptions.signal.addEventListener("abort", () => {
                controller.abort();
            });
        }
        fetchOptions.signal = controller.signal;
    }
    return fetchOptions;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Adds convenience helper methods to a response object, including stream
 * chunks (as long as each chunk is a complete GenerateContentResponse JSON).
 */
function addHelpers(response) {
    response.text = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning text from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            return getText(response);
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return "";
    };
    /**
     * TODO: remove at next major version
     */
    response.functionCall = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning function calls from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            console.warn(`response.functionCall() is deprecated. ` +
                `Use response.functionCalls() instead.`);
            return getFunctionCalls(response)[0];
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return undefined;
    };
    response.functionCalls = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning function calls from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            return getFunctionCalls(response);
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return undefined;
    };
    return response;
}
/**
 * Returns all text found in all parts of first candidate.
 */
function getText(response) {
    var _a, _b, _c, _d;
    const textStrings = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.text) {
                textStrings.push(part.text);
            }
            if (part.executableCode) {
                textStrings.push("\n```" +
                    part.executableCode.language +
                    "\n" +
                    part.executableCode.code +
                    "\n```\n");
            }
            if (part.codeExecutionResult) {
                textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
            }
        }
    }
    if (textStrings.length > 0) {
        return textStrings.join("");
    }
    else {
        return "";
    }
}
/**
 * Returns functionCall of first candidate.
 */
function getFunctionCalls(response) {
    var _a, _b, _c, _d;
    const functionCalls = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.functionCall) {
                functionCalls.push(part.functionCall);
            }
        }
    }
    if (functionCalls.length > 0) {
        return functionCalls;
    }
    else {
        return undefined;
    }
}
const badFinishReasons = [
    exports.eD.RECITATION,
    exports.eD.SAFETY,
    exports.eD.LANGUAGE,
];
function hadBadFinishReason(candidate) {
    return (!!candidate.finishReason &&
        badFinishReasons.includes(candidate.finishReason));
}
function formatBlockErrorMessage(response) {
    var _a, _b, _c;
    let message = "";
    if ((!response.candidates || response.candidates.length === 0) &&
        response.promptFeedback) {
        message += "Response was blocked";
        if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
            message += ` due to ${response.promptFeedback.blockReason}`;
        }
        if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
            message += `: ${response.promptFeedback.blockReasonMessage}`;
        }
    }
    else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
        const firstCandidate = response.candidates[0];
        if (hadBadFinishReason(firstCandidate)) {
            message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
            if (firstCandidate.finishMessage) {
                message += `: ${firstCandidate.finishMessage}`;
            }
        }
    }
    return message;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
/**
 * Process a response.body stream from the backend and return an
 * iterator that provides one complete GenerateContentResponse at a time
 * and a promise that resolves with a single aggregated
 * GenerateContentResponse.
 *
 * @param response - Response from a fetch call
 */
function processStream(response) {
    const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
    const responseStream = getResponseStream(inputStream);
    const [stream1, stream2] = responseStream.tee();
    return {
        stream: generateResponseSequence(stream1),
        response: getResponsePromise(stream2),
    };
}
async function getResponsePromise(stream) {
    const allResponses = [];
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            return addHelpers(aggregateResponses(allResponses));
        }
        allResponses.push(value);
    }
}
function generateResponseSequence(stream) {
    return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
        const reader = stream.getReader();
        while (true) {
            const { value, done } = yield __await(reader.read());
            if (done) {
                break;
            }
            yield yield __await(addHelpers(value));
        }
    });
}
/**
 * Reads a raw stream from the fetch response and join incomplete
 * chunks, returning a new stream that provides a single complete
 * GenerateContentResponse in each iteration.
 */
function getResponseStream(inputStream) {
    const reader = inputStream.getReader();
    const stream = new ReadableStream({
        start(controller) {
            let currentText = "";
            return pump();
            function pump() {
                return reader
                    .read()
                    .then(({ value, done }) => {
                    if (done) {
                        if (currentText.trim()) {
                            controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
                            return;
                        }
                        controller.close();
                        return;
                    }
                    currentText += value;
                    let match = currentText.match(responseLineRE);
                    let parsedResponse;
                    while (match) {
                        try {
                            parsedResponse = JSON.parse(match[1]);
                        }
                        catch (e) {
                            controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
                            return;
                        }
                        controller.enqueue(parsedResponse);
                        currentText = currentText.substring(match[0].length);
                        match = currentText.match(responseLineRE);
                    }
                    return pump();
                })
                    .catch((e) => {
                    let err = e;
                    err.stack = e.stack;
                    if (err.name === "AbortError") {
                        err = new GoogleGenerativeAIAbortError("Request aborted when reading from the stream");
                    }
                    else {
                        err = new GoogleGenerativeAIError("Error reading from the stream");
                    }
                    throw err;
                });
            }
        },
    });
    return stream;
}
/**
 * Aggregates an array of `GenerateContentResponse`s into a single
 * GenerateContentResponse.
 */
function aggregateResponses(responses) {
    const lastResponse = responses[responses.length - 1];
    const aggregatedResponse = {
        promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback,
    };
    for (const response of responses) {
        if (response.candidates) {
            let candidateIndex = 0;
            for (const candidate of response.candidates) {
                if (!aggregatedResponse.candidates) {
                    aggregatedResponse.candidates = [];
                }
                if (!aggregatedResponse.candidates[candidateIndex]) {
                    aggregatedResponse.candidates[candidateIndex] = {
                        index: candidateIndex,
                    };
                }
                // Keep overwriting, the last one will be final
                aggregatedResponse.candidates[candidateIndex].citationMetadata =
                    candidate.citationMetadata;
                aggregatedResponse.candidates[candidateIndex].groundingMetadata =
                    candidate.groundingMetadata;
                aggregatedResponse.candidates[candidateIndex].finishReason =
                    candidate.finishReason;
                aggregatedResponse.candidates[candidateIndex].finishMessage =
                    candidate.finishMessage;
                aggregatedResponse.candidates[candidateIndex].safetyRatings =
                    candidate.safetyRatings;
                /**
                 * Candidates should always have content and parts, but this handles
                 * possible malformed responses.
                 */
                if (candidate.content && candidate.content.parts) {
                    if (!aggregatedResponse.candidates[candidateIndex].content) {
                        aggregatedResponse.candidates[candidateIndex].content = {
                            role: candidate.content.role || "user",
                            parts: [],
                        };
                    }
                    const newPart = {};
                    for (const part of candidate.content.parts) {
                        if (part.text) {
                            newPart.text = part.text;
                        }
                        if (part.functionCall) {
                            newPart.functionCall = part.functionCall;
                        }
                        if (part.executableCode) {
                            newPart.executableCode = part.executableCode;
                        }
                        if (part.codeExecutionResult) {
                            newPart.codeExecutionResult = part.codeExecutionResult;
                        }
                        if (Object.keys(newPart).length === 0) {
                            newPart.text = "";
                        }
                        aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
                    }
                }
            }
            candidateIndex++;
        }
        if (response.usageMetadata) {
            aggregatedResponse.usageMetadata = response.usageMetadata;
        }
    }
    return aggregatedResponse;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function generateContentStream(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.STREAM_GENERATE_CONTENT, apiKey, 
    /* stream */ true, JSON.stringify(params), requestOptions);
    return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.GENERATE_CONTENT, apiKey, 
    /* stream */ false, JSON.stringify(params), requestOptions);
    const responseJson = await response.json();
    const enhancedResponse = addHelpers(responseJson);
    return {
        response: enhancedResponse,
    };
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function formatSystemInstruction(input) {
    // null or undefined
    if (input == null) {
        return undefined;
    }
    else if (typeof input === "string") {
        return { role: "system", parts: [{ text: input }] };
    }
    else if (input.text) {
        return { role: "system", parts: [input] };
    }
    else if (input.parts) {
        if (!input.role) {
            return { role: "system", parts: input.parts };
        }
        else {
            return input;
        }
    }
}
function formatNewContent(request) {
    let newParts = [];
    if (typeof request === "string") {
        newParts = [{ text: request }];
    }
    else {
        for (const partOrString of request) {
            if (typeof partOrString === "string") {
                newParts.push({ text: partOrString });
            }
            else {
                newParts.push(partOrString);
            }
        }
    }
    return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
/**
 * When multiple Part types (i.e. FunctionResponsePart and TextPart) are
 * passed in a single Part array, we may need to assign different roles to each
 * part. Currently only FunctionResponsePart requires a role other than 'user'.
 * @private
 * @param parts Array of parts to pass to the model
 * @returns Array of content items
 */
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
    const userContent = { role: "user", parts: [] };
    const functionContent = { role: "function", parts: [] };
    let hasUserContent = false;
    let hasFunctionContent = false;
    for (const part of parts) {
        if ("functionResponse" in part) {
            functionContent.parts.push(part);
            hasFunctionContent = true;
        }
        else {
            userContent.parts.push(part);
            hasUserContent = true;
        }
    }
    if (hasUserContent && hasFunctionContent) {
        throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
    }
    if (!hasUserContent && !hasFunctionContent) {
        throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
    }
    if (hasUserContent) {
        return userContent;
    }
    return functionContent;
}
function formatCountTokensInput(params, modelParams) {
    var _a;
    let formattedGenerateContentRequest = {
        model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
        generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
        safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
        tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
        toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
        systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
        cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
        contents: [],
    };
    const containsGenerateContentRequest = params.generateContentRequest != null;
    if (params.contents) {
        if (containsGenerateContentRequest) {
            throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
        }
        formattedGenerateContentRequest.contents = params.contents;
    }
    else if (containsGenerateContentRequest) {
        formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
    }
    else {
        // Array or string
        const content = formatNewContent(params);
        formattedGenerateContentRequest.contents = [content];
    }
    return { generateContentRequest: formattedGenerateContentRequest };
}
function formatGenerateContentInput(params) {
    let formattedRequest;
    if (params.contents) {
        formattedRequest = params;
    }
    else {
        // Array or string
        const content = formatNewContent(params);
        formattedRequest = { contents: [content] };
    }
    if (params.systemInstruction) {
        formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
    }
    return formattedRequest;
}
function formatEmbedContentInput(params) {
    if (typeof params === "string" || Array.isArray(params)) {
        const content = formatNewContent(params);
        return { content };
    }
    return params;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// https://ai.google.dev/api/rest/v1beta/Content#part
const VALID_PART_FIELDS = [
    "text",
    "inlineData",
    "functionCall",
    "functionResponse",
    "executableCode",
    "codeExecutionResult",
];
const VALID_PARTS_PER_ROLE = {
    user: ["text", "inlineData"],
    function: ["functionResponse"],
    model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
    // System instructions shouldn't be in history anyway.
    system: ["text"],
};
function validateChatHistory(history) {
    let prevContent = false;
    for (const currContent of history) {
        const { role, parts } = currContent;
        if (!prevContent && role !== "user") {
            throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
        }
        if (!POSSIBLE_ROLES.includes(role)) {
            throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
        }
        if (!Array.isArray(parts)) {
            throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
        }
        if (parts.length === 0) {
            throw new GoogleGenerativeAIError("Each Content should have at least one part");
        }
        const countFields = {
            text: 0,
            inlineData: 0,
            functionCall: 0,
            functionResponse: 0,
            fileData: 0,
            executableCode: 0,
            codeExecutionResult: 0,
        };
        for (const part of parts) {
            for (const key of VALID_PART_FIELDS) {
                if (key in part) {
                    countFields[key] += 1;
                }
            }
        }
        const validParts = VALID_PARTS_PER_ROLE[role];
        for (const key of VALID_PART_FIELDS) {
            if (!validParts.includes(key) && countFields[key] > 0) {
                throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
            }
        }
        prevContent = true;
    }
}
/**
 * Returns true if the response is valid (could be appended to the history), flase otherwise.
 */
function isValidResponse(response) {
    var _a;
    if (response.candidates === undefined || response.candidates.length === 0) {
        return false;
    }
    const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
    if (content === undefined) {
        return false;
    }
    if (content.parts === undefined || content.parts.length === 0) {
        return false;
    }
    for (const part of content.parts) {
        if (part === undefined || Object.keys(part).length === 0) {
            return false;
        }
        if (part.text !== undefined && part.text === "") {
            return false;
        }
    }
    return true;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do not log a message for this error.
 */
const SILENT_ERROR = "SILENT_ERROR";
/**
 * ChatSession class that enables sending chat messages and stores
 * history of sent and received messages so far.
 *
 * @public
 */
class ChatSession {
    constructor(apiKey, model, params, _requestOptions = {}) {
        this.model = model;
        this.params = params;
        this._requestOptions = _requestOptions;
        this._history = [];
        this._sendPromise = Promise.resolve();
        this._apiKey = apiKey;
        if (params === null || params === void 0 ? void 0 : params.history) {
            validateChatHistory(params.history);
            this._history = params.history;
        }
    }
    /**
     * Gets the chat history so far. Blocked prompts are not added to history.
     * Blocked candidates are not added to history, nor are the prompts that
     * generated them.
     */
    async getHistory() {
        await this._sendPromise;
        return this._history;
    }
    /**
     * Sends a chat message and receives a non-streaming
     * {@link GenerateContentResult}.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async sendMessage(request, requestOptions = {}) {
        var _a, _b, _c, _d, _e, _f;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent],
        };
        const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        let finalResult;
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions))
            .then((result) => {
            var _a;
            if (isValidResponse(result.response)) {
                this._history.push(newContent);
                const responseContent = Object.assign({ parts: [], 
                    // Response seems to come back without a role set.
                    role: "model" }, (_a = result.response.candidates) === null || _a === void 0 ? void 0 : _a[0].content);
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(result.response);
                if (blockErrorMessage) {
                    console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
            finalResult = result;
        })
            .catch((e) => {
            // Resets _sendPromise to avoid subsequent calls failing and throw error.
            this._sendPromise = Promise.resolve();
            throw e;
        });
        await this._sendPromise;
        return finalResult;
    }
    /**
     * Sends a chat message and receives the response as a
     * {@link GenerateContentStreamResult} containing an iterable stream
     * and a response promise.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async sendMessageStream(request, requestOptions = {}) {
        var _a, _b, _c, _d, _e, _f;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent],
        };
        const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => streamPromise)
            // This must be handled to avoid unhandled rejection, but jump
            // to the final catch block with a label to not log this error.
            .catch((_ignored) => {
            throw new Error(SILENT_ERROR);
        })
            .then((streamResult) => streamResult.response)
            .then((response) => {
            if (isValidResponse(response)) {
                this._history.push(newContent);
                const responseContent = Object.assign({}, response.candidates[0].content);
                // Response seems to come back without a role set.
                if (!responseContent.role) {
                    responseContent.role = "model";
                }
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(response);
                if (blockErrorMessage) {
                    console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
        })
            .catch((e) => {
            // Errors in streamPromise are already catchable by the user as
            // streamPromise is returned.
            // Avoid duplicating the error message in logs.
            if (e.message !== SILENT_ERROR) {
                // Users do not have access to _sendPromise to catch errors
                // downstream from streamPromise, so they should not throw.
                console.error(e);
            }
        });
        return streamPromise;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function countTokens(apiKey, model, params, singleRequestOptions) {
    const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
    return response.json();
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function embedContent(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
    return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
    const requestsWithModel = params.requests.map((request) => {
        return Object.assign(Object.assign({}, request), { model });
    });
    const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
    return response.json();
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Class for generative model APIs.
 * @public
 */
class GenerativeModel {
    constructor(apiKey, modelParams, _requestOptions = {}) {
        this.apiKey = apiKey;
        this._requestOptions = _requestOptions;
        if (modelParams.model.includes("/")) {
            // Models may be named "models/model-name" or "tunedModels/model-name"
            this.model = modelParams.model;
        }
        else {
            // If path is not included, assume it's a non-tuned model.
            this.model = `models/${modelParams.model}`;
        }
        this.generationConfig = modelParams.generationConfig || {};
        this.safetySettings = modelParams.safetySettings || [];
        this.tools = modelParams.tools;
        this.toolConfig = modelParams.toolConfig;
        this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
        this.cachedContent = modelParams.cachedContent;
    }
    /**
     * Makes a single non-streaming call to the model
     * and returns an object containing a single {@link GenerateContentResponse}.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async generateContent(request, requestOptions = {}) {
        var _a;
        const formattedParams = formatGenerateContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
    }
    /**
     * Makes a single streaming call to the model and returns an object
     * containing an iterable stream that iterates over all chunks in the
     * streaming response as well as a promise that returns the final
     * aggregated response.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async generateContentStream(request, requestOptions = {}) {
        var _a;
        const formattedParams = formatGenerateContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
    }
    /**
     * Gets a new {@link ChatSession} instance which can be used for
     * multi-turn chats.
     */
    startChat(startChatParams) {
        var _a;
        return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
    }
    /**
     * Counts the tokens in the provided request.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async countTokens(request, requestOptions = {}) {
        const formattedParams = formatCountTokensInput(request, {
            model: this.model,
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools,
            toolConfig: this.toolConfig,
            systemInstruction: this.systemInstruction,
            cachedContent: this.cachedContent,
        });
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
    }
    /**
     * Embeds the provided content.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async embedContent(request, requestOptions = {}) {
        const formattedParams = formatEmbedContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
    }
    /**
     * Embeds an array of {@link EmbedContentRequest}s.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Top-level class for this SDK
 * @public
 */
class GoogleGenerativeAI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    /**
     * Gets a {@link GenerativeModel} instance for the provided model name.
     */
    getGenerativeModel(modelParams, requestOptions) {
        if (!modelParams.model) {
            throw new GoogleGenerativeAIError(`Must provide a model name. ` +
                `Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
        }
        return new GenerativeModel(this.apiKey, modelParams, requestOptions);
    }
    /**
     * Creates a {@link GenerativeModel} instance from provided content cache.
     */
    getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
        if (!cachedContent.name) {
            throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
        }
        if (!cachedContent.model) {
            throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
        }
        /**
         * Not checking tools and toolConfig for now as it would require a deep
         * equality comparison and isn't likely to be a common case.
         */
        const disallowedDuplicates = ["model", "systemInstruction"];
        for (const key of disallowedDuplicates) {
            if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) &&
                cachedContent[key] &&
                (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
                if (key === "model") {
                    const modelParamsComp = modelParams.model.startsWith("models/")
                        ? modelParams.model.replace("models/", "")
                        : modelParams.model;
                    const cachedContentComp = cachedContent.model.startsWith("models/")
                        ? cachedContent.model.replace("models/", "")
                        : cachedContent.model;
                    if (modelParamsComp === cachedContentComp) {
                        continue;
                    }
                }
                throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams` +
                    ` (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
            }
        }
        const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
        return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
    }
}

__webpack_unused_export__ = ChatSession;
__webpack_unused_export__ = GenerativeModel;
exports.GoogleGenerativeAI = GoogleGenerativeAI;
__webpack_unused_export__ = GoogleGenerativeAIAbortError;
__webpack_unused_export__ = GoogleGenerativeAIError;
__webpack_unused_export__ = GoogleGenerativeAIFetchError;
__webpack_unused_export__ = GoogleGenerativeAIRequestInputError;
__webpack_unused_export__ = GoogleGenerativeAIResponseError;
__webpack_unused_export__ = POSSIBLE_ROLES;
//# sourceMappingURL=index.js.map


/***/ },

/***/ 2551
(__unused_webpack_module, exports, __webpack_require__) {

/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(6540),ca=__webpack_require__(9982);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b)}
function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a])}
var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
{},ma={};function oa(a){if(ja.call(ma,a))return!0;if(ja.call(la,a))return!1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return!1}function pa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var z={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
sa);z[b]=new v(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1)});
z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0)});
function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}
var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
var Ia=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return"function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||""}return"\n"+La+a}var Na=!1;
function Oa(a,b){if(!a||Na)return"";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Ma(a):""}
function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return""}}
function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return(a.displayName||"Context")+".Consumer";case Ba:return(a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
function Ra(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return"Offscreen";
case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}
function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1)}
function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var eb=Array.isArray;
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function kb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var mb,nb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a]})});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
function vb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb()}}
function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb)}catch(a){Lb=!1}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments)}
function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=l)}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling}return null}
var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128))}catch(b){}}
var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)))}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId)}}
function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return!1}
function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift()}return!0}function Zc(a,b,c){Xc(a)&&c.delete(b)}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc)}
function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}
function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;
function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d)}finally{C=e,cd.transition=f}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d)}finally{C=e,cd.transition=f}}
function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else hd(a,b,d,null,c)}}var id=null;
function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);id=a;return null}
function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b)}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
function Ie(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return!1}return!0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Je(c)}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}
var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a,b){df.set(a,b);fa(b,[a])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d))}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b))}}
function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Jb(function(){var d=f,e=xb(c),g=[];
a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x)}t=null}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else{na=De;var xa=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
xa.controlled&&"number"===h.type&&cb(h,"number",h.value)}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a)}se(g,b)})}function tf(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
var Cf=null,Df=null;function Ef(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;})}
function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);bd(b)}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[Of]||a[uf];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return{current:a}}
function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H)}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c)}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return!0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c)}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a)}function ig(a){fg=!0;hg(a)}
function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b}
function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a}else rg=1<<f|c<<e|d,sg=a}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0))}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;
function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
null,!0):!1;default:return!1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a)}}else{if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a}
function Gg(a){if(a!==xg)return!1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling)}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}yg=
null}}else yg=xg?Lf(a.stateNode.nextSibling):null;return!0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling)}function Ig(){yg=xg=null;I=!1}function Jg(a){null===zg?zg=[a]:zg.push(a)}var Kg=ua.ReactCurrentBatchConfig;
function Lg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
function Mg(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ng(a){var b=a._init;return b(a._payload)}
function Og(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Pg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Qg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&Ng(f)===b.type))return d=e(b,c.props),d.ref=Lg(a,b,c),d.return=a,d;d=Rg(c.type,c.key,c.props,null,a.mode,d);d.ref=Lg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=Sg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Tg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=Qg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=Rg(b.type,b.key,b.props,null,a.mode,c),
c.ref=Lg(a,null,b),c.return=a,c;case wa:return b=Sg(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Tg(b,a.mode,c,null),b.return=a,b;Mg(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);Mg(a,c)}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);Mg(b,d)}return null}
function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x}if(n.done)return c(e,
m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&Ng(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=Lg(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ya?(d=Tg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Rg(f.type,f.key,f.props,null,a.mode,h),h.ref=Lg(a,d,f),h.return=a,a=h)}return g(a);case wa:a:{for(l=f.key;null!==
d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Sg(f,a.mode,h);d.return=a;a=d}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);Mg(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=Qg(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Ug=Og(!0),Vg=Og(!1),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null}function ah(a){var b=Wg.current;E(Wg);a._currentValue=b}function bh(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}
function ch(a,b){Xg=a;Zg=Yg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(dh=!0),a.firstContext=null)}function eh(a){var b=a._currentValue;if(Zg!==a)if(a={context:a,memoizedValue:b,next:null},null===Yg){if(null===Xg)throw Error(p(308));Yg=a;Xg.dependencies={lanes:0,firstContext:a}}else Yg=Yg.next=a;return b}var fh=null;function gh(a){null===fh?fh=[a]:fh.push(a)}
function hh(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,gh(b)):(c.next=e.next,e.next=c);b.interleaved=c;return ih(a,d)}function ih(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var jh=!1;function kh(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
function lh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function mh(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function nh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return ih(a,c)}e=d.interleaved;null===e?(b.next=b,gh(d)):(b.next=e.next,e.next=b);d.interleaved=b;return ih(a,c)}function oh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
function ph(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function qh(a,b,c,d){var e=a.updateQueue;jh=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k))}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:jh=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);rh|=g;a.lanes=g;a.memoizedState=q}}
function sh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d)}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(a){if(a===th)throw Error(p(174));return a}
function yh(a,b){G(wh,b);G(vh,a);G(uh,th);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a)}E(uh);G(uh,b)}function zh(){E(uh);E(vh);E(wh)}function Ah(a){xh(wh.current);var b=xh(uh.current);var c=lb(b,a.type);b!==c&&(G(vh,a),G(uh,c))}function Bh(a){vh.current===a&&(E(uh),E(vh))}var L=Uf(0);
function Ch(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var Dh=[];
function Eh(){for(var a=0;a<Dh.length;a++)Dh[a]._workInProgressVersionPrimary=null;Dh.length=0}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=!1,Jh=!1,Kh=0,Lh=0;function P(){throw Error(p(321));}function Mh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Nh(a,b,c,d,e,f){Hh=f;M=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Fh.current=null===a||null===a.memoizedState?Oh:Ph;a=c(d,e);if(Jh){f=0;do{Jh=!1;Kh=0;if(25<=f)throw Error(p(301));f+=1;O=N=null;b.updateQueue=null;Fh.current=Qh;a=c(d,e)}while(Jh)}Fh.current=Rh;b=null!==N&&null!==N.next;Hh=0;O=N=M=null;Ih=!1;if(b)throw Error(p(300));return a}function Sh(){var a=0!==Kh;Kh=0;return a}
function Th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===O?M.memoizedState=O=a:O=O.next=a;return O}function Uh(){if(null===N){var a=M.alternate;a=null!==a?a.memoizedState:null}else a=N.next;var b=null===O?M.memoizedState:O.next;if(null!==b)O=b,N=a;else{if(null===a)throw Error(p(310));N=a;a={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null};null===O?M.memoizedState=O=a:O=O.next=a}return O}
function Vh(a,b){return"function"===typeof b?b(a):b}
function Wh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=N,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Hh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;M.lanes|=m;rh|=m}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(dh=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,M.lanes|=f,rh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
function Xh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(dh=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Yh(){}
function Zh(a,b){var c=M,d=Uh(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,dh=!0);d=d.queue;$h(ai.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==O&&O.memoizedState.tag&1){c.flags|=2048;bi(9,ci.bind(null,c,d,e,b),void 0,null);if(null===Q)throw Error(p(349));0!==(Hh&30)||di(c,b,e)}return e}function di(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
function ci(a,b,c,d){b.value=c;b.getSnapshot=d;ei(b)&&fi(a)}function ai(a,b,c){return c(function(){ei(b)&&fi(a)})}function ei(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!He(a,c)}catch(d){return!0}}function fi(a){var b=ih(a,1);null!==b&&gi(b,a,1,-1)}
function hi(a){var b=Th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:a};b.queue=a;a=a.dispatch=ii.bind(null,M,a);return[b.memoizedState,a]}
function bi(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ji(){return Uh().memoizedState}function ki(a,b,c,d){var e=Th();M.flags|=a;e.memoizedState=bi(1|b,c,void 0,void 0===d?null:d)}
function li(a,b,c,d){var e=Uh();d=void 0===d?null:d;var f=void 0;if(null!==N){var g=N.memoizedState;f=g.destroy;if(null!==d&&Mh(d,g.deps)){e.memoizedState=bi(b,c,f,d);return}}M.flags|=a;e.memoizedState=bi(1|b,c,f,d)}function mi(a,b){return ki(8390656,8,a,b)}function $h(a,b){return li(2048,8,a,b)}function ni(a,b){return li(4,2,a,b)}function oi(a,b){return li(4,4,a,b)}
function pi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function qi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return li(4,4,pi.bind(null,b,a),c)}function ri(){}function si(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function ti(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ui(a,b,c){if(0===(Hh&21))return a.baseState&&(a.baseState=!1,dh=!0),a.memoizedState=c;He(c,b)||(c=yc(),M.lanes|=c,rh|=c,a.baseState=!0);return b}function vi(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Gh.transition;Gh.transition={};try{a(!1),b()}finally{C=c,Gh.transition=d}}function wi(){return Uh().memoizedState}
function xi(a,b,c){var d=yi(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,c);else if(c=hh(a,b,c,d),null!==c){var e=R();gi(c,a,d,e);Bi(c,b,d)}}
function ii(a,b,c){var d=yi(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,gh(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=hh(a,b,e,d);null!==c&&(e=R(),gi(c,a,d,e),Bi(c,b,d))}}
function zi(a){var b=a.alternate;return a===M||null!==b&&b===M}function Ai(a,b){Jh=Ih=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Bi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:!1},Oh={readContext:eh,useCallback:function(a,b){Th().memoizedState=[a,void 0===b?null:b];return a},useContext:eh,useEffect:mi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ki(4194308,
4,pi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ki(4194308,4,a,b)},useInsertionEffect:function(a,b){return ki(4,2,a,b)},useMemo:function(a,b){var c=Th();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=xi.bind(null,M,a);return[d.memoizedState,a]},useRef:function(a){var b=
Th();a={current:a};return b.memoizedState=a},useState:hi,useDebugValue:ri,useDeferredValue:function(a){return Th().memoizedState=a},useTransition:function(){var a=hi(!1),b=a[0];a=vi.bind(null,a[1]);Th().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=M,e=Th();if(I){if(void 0===c)throw Error(p(407));c=c()}else{c=b();if(null===Q)throw Error(p(349));0!==(Hh&30)||di(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;mi(ai.bind(null,d,
f,a),[a]);d.flags|=2048;bi(9,ci.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Th(),b=Q.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Kh++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Lh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},
useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return ui(b,N.memoizedState,a)},useTransition:function(){var a=Wh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return null===
N?b.memoizedState=a:ui(b,N.memoizedState,a)},useTransition:function(){var a=Xh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1};function Ci(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function Di(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Ei={isMounted:function(a){return(a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=R(),d=
yi(a),e=mh(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=nh(a,e,d);null!==b&&(gi(b,a,d,c),oh(b,a,d))}};function Fi(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
function Gi(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=eh(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Ei;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Hi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Ei.enqueueReplaceState(b,b.state,null)}
function Ii(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};kh(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=eh(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Di(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Ei.enqueueReplaceState(e,e.state,null),qh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ji(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}
function Ki(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function Li(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Mi="function"===typeof WeakMap?WeakMap:Map;function Ni(a,b,c){c=mh(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Oi||(Oi=!0,Pi=d);Li(a,b)};return c}
function Qi(a,b,c){c=mh(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Li(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Li(a,b);"function"!==typeof d&&(null===Ri?Ri=new Set([this]):Ri.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
function Si(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Mi;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ti.bind(null,a,b,c),b.then(a,a))}function Ui(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
function Vi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=mh(-1,1),b.tag=2,nh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Wi=ua.ReactCurrentOwner,dh=!1;function Xi(a,b,c,d){b.child=null===a?Vg(b,null,c,d):Ug(b,a.child,c,d)}
function Yi(a,b,c,d,e){c=c.render;var f=b.ref;ch(b,e);d=Nh(a,b,c,d,f,e);c=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&c&&vg(b);b.flags|=1;Xi(a,b,d,e);return b.child}
function $i(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!aj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bj(a,b,f,d,e);a=Rg(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return Zi(a,b,e)}b.flags|=1;a=Pg(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function bj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(dh=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(dh=!0);else return b.lanes=a.lanes,Zi(a,b,e)}return cj(a,b,c,d,e)}
function dj(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(ej,fj),fj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(ej,fj);fj|=d}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(ej,fj),fj|=d;Xi(a,b,e,c);return b.child}function gj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function cj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);ch(b,e);c=Nh(a,b,c,d,f,e);d=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&d&&vg(b);b.flags|=1;Xi(a,b,c,e);return b.child}
function hj(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b)}else f=!1;ch(b,e);if(null===b.stateNode)ij(a,b),Gi(b,c,d),Ii(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=eh(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
(h!==d||k!==l)&&Hi(b,g,d,l);jh=!1;var r=b.memoizedState;g.state=r;qh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||jh?("function"===typeof m&&(Di(b,c,m,d),k=b.memoizedState),(h=jh||Fi(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;lh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Ci(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=eh(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&Hi(b,g,d,k);jh=!1;r=b.memoizedState;g.state=r;qh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||jh?("function"===typeof y&&(Di(b,c,y,d),n=b.memoizedState),(l=jh||Fi(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return jj(a,b,c,d,f,e)}
function jj(a,b,c,d,e,f){gj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),Zi(a,b,f);d=b.stateNode;Wi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Ug(b,a.child,null,f),b.child=Ug(b,null,h,f)):Xi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function kj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);yh(a,b.containerInfo)}
function lj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Xi(a,b,c,d);return b.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(a){return{baseLanes:a,cachePool:null,transitions:null}}
function oj(a,b,c){var d=b.pendingProps,e=L.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(L,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
g):f=pj(g,d,0,null),a=Tg(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=nj(c),b.memoizedState=mj,a):qj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return rj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=Pg(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=Pg(h,f):(f=Tg(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?nj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=mj;return d}f=a.child;a=f.sibling;d=Pg(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function qj(a,b){b=pj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sj(a,b,c,d){null!==d&&Jg(d);Ug(b,a.child,null,c);a=qj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function rj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Ki(Error(p(422))),sj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=pj({mode:"visible",children:d.children},e,0,null);f=Tg(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Ug(b,a.child,null,g);b.child.memoizedState=nj(g);b.memoizedState=mj;return f}if(0===(b.mode&1))return sj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
if(d)var h=d.dgst;d=h;f=Error(p(419));d=Ki(f,d,void 0);return sj(a,b,g,d)}h=0!==(g&a.childLanes);if(dh||h){d=Q;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;
0!==e&&e!==f.retryLane&&(f.retryLane=e,ih(a,e),gi(d,a,e,-1))}tj();d=Ki(Error(p(421)));return sj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=uj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=qj(b,d.children);b.flags|=4096;return b}function vj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);bh(a.return,b,c)}
function wj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
function xj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Xi(a,b,d.children,c);d=L.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&vj(a,c,b);else if(19===a.tag)vj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}G(L,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ch(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);wj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ch(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}wj(b,!0,c,null,f);break;case "together":wj(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
function ij(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Zi(a,b,c){null!==a&&(b.dependencies=a.dependencies);rh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=Pg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Pg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
function yj(a,b,c){switch(b.tag){case 3:kj(b);Ig();break;case 5:Ah(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:yh(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Wg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(L,L.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return oj(a,b,c);G(L,L.current&1);a=Zi(a,b,c);return null!==a?a.sibling:null}G(L,L.current&1);break;case 19:d=0!==(c&
b.childLanes);if(0!==(a.flags&128)){if(d)return xj(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(L,L.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dj(a,b,c)}return Zi(a,b,c)}var zj,Aj,Bj,Cj;
zj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Aj=function(){};
Bj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;xh(uh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf)}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,
c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4}};Cj=function(a,b,c,d){c!==d&&(b.flags|=4)};
function Dj(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Ej(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;zh();E(Wf);E(H);Eh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Fj(zg),zg=null));Aj(a,b);S(b);return null;case 5:Bh(b);var e=xh(wh.current);
c=b.type;if(null!==a&&null!=b.stateNode)Bj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d)}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d)}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;zj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g))}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
!0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}S(b);return null;case 6:if(a&&null!=b.stateNode)Cj(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=xh(wh.current);xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d}S(b);return null;case 13:E(L);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1}else null!==zg&&(Fj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(L.current&1)?0===T&&(T=3):tj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return zh(),
Aj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return ah(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(L);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dj(f,!1);else{if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Ch(a);if(null!==g){b.flags|=128;Dj(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(L,L.current&1|2);return b.child}a=
a.sibling}null!==f.tail&&B()>Gj&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304)}else{if(!d)if(a=Ch(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dj(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Gj&&1073741824!==c&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=
b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=L.current,G(L,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Hj(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(fj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
function Ij(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return zh(),E(Wf),E(H),Eh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Bh(b),null;case 13:E(L);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(b.type._context),null;case 22:case 23:return Hj(),
null;case 24:return null;default:return null}}var Jj=!1,U=!1,Kj="function"===typeof WeakSet?WeakSet:Set,V=null;function Lj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){W(a,b,d)}else c.current=null}function Mj(a,b,c){try{c()}catch(d){W(a,b,d)}}var Nj=!1;
function Oj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode}q=y}c=-1===h||-1===k?null:{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Ci(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F)}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return}n=Nj;Nj=!1;return n}
function Pj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Mj(b,c,f)}e=e.next}while(e!==d)}}function Qj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Rj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}
function Sj(a){var b=a.alternate;null!==b&&(a.alternate=null,Sj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Tj(a){return 5===a.tag||3===a.tag||4===a.tag}
function Uj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Tj(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
function Vj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Vj(a,b,c),a=a.sibling;null!==a;)Vj(a,b,c),a=a.sibling}
function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling}var X=null,Xj=!1;function Yj(a,b,c){for(c=c.child;null!==c;)Zj(a,b,c),c=c.sibling}
function Zj(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c)}catch(h){}switch(c.tag){case 5:U||Lj(c,b);case 6:var d=X,e=Xj;X=null;Yj(a,b,c);X=d;Xj=e;null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Xj;X=c.stateNode.containerInfo;Xj=!0;
Yj(a,b,c);X=d;Xj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Mj(c,b,g):0!==(f&4)&&Mj(c,b,g));e=e.next}while(e!==d)}Yj(a,b,c);break;case 1:if(!U&&(Lj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){W(c,b,h)}Yj(a,b,c);break;case 21:Yj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
c.memoizedState,Yj(a,b,c),U=d):Yj(a,b,c);break;default:Yj(a,b,c)}}function ak(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Kj);b.forEach(function(b){var d=bk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function ck(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Xj=!1;break a;case 3:X=h.stateNode.containerInfo;Xj=!0;break a;case 4:X=h.stateNode.containerInfo;Xj=!0;break a}h=h.return}if(null===X)throw Error(p(160));Zj(f,g,e);X=null;Xj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){W(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)dk(b,a),b=b.sibling}
function dk(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:ck(b,a);ek(a);if(d&4){try{Pj(3,a,a.return),Qj(3,a)}catch(t){W(a,a.return,t)}try{Pj(5,a,a.return)}catch(t){W(a,a.return,t)}}break;case 1:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);break;case 5:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"")}catch(t){W(a,a.return,t)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l)}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1))}e[Pf]=f}catch(t){W(a,a.return,t)}}break;case 6:ck(b,a);ek(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(t){W(a,a.return,t)}}break;case 3:ck(b,a);ek(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo)}catch(t){W(a,a.return,t)}break;case 4:ck(b,a);ek(a);break;case 13:ck(b,a);ek(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
null!==e.alternate&&null!==e.alternate.memoizedState||(fk=B()));d&4&&ak(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,ck(b,a),U=l):ck(b,a);ek(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Pj(4,r,r.return);break;case 1:Lj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount()}catch(t){W(d,c,t)}}break;case 5:Lj(r,r.return);break;case 22:if(null!==r.memoizedState){gk(q);continue}}null!==y?(y.return=r,V=y):gk(q)}m=m.sibling}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
rb("display",g))}catch(t){W(a,a.return,t)}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps}catch(t){W(a,a.return,t)}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling}}break;case 19:ck(b,a);ek(a);d&4&&ak(a);break;case 21:break;default:ck(b,
a),ek(a)}}function ek(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Tj(c)){var d=c;break a}c=c.return}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Uj(a);Wj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Uj(a);Vj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function hk(a,b,c){V=a;ik(a,b,c)}
function ik(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Jj;var l=U;Jj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?jk(e):null!==k?(k.return=g,V=k):jk(e);for(;null!==f;)V=f,ik(f,b,c),f=f.sibling;V=e;Jj=h;U=l}kk(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):kk(a,b,c)}}
function kk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Qj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Ci(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&sh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
b.child.stateNode;break;case 1:c=b.child.stateNode}sh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(p(163));}U||b.flags&512&&Rj(b)}catch(r){W(b,b.return,r)}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}function gk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}
function jk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Qj(4,b)}catch(k){W(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){W(b,e,k)}}var f=b.return;try{Rj(b)}catch(k){W(b,f,k)}break;case 5:var g=b.return;try{Rj(b)}catch(k){W(b,g,k)}}}catch(k){W(b,b.return,k)}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return}}
var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=Infinity,uk=null,Oi=!1,Pi=null,Ri=null,vk=!1,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return 0!==(K&6)?B():-1!==Ak?Ak:Ak=B()}
function yi(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Bk&&(Bk=yc()),Bk;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function gi(a,b,c,d){if(50<yk)throw yk=0,zk=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==Q)a===Q&&(0===(K&2)&&(qk|=c),4===T&&Ck(a,Z)),Dk(a,d),1===c&&0===K&&0===(b.mode&1)&&(Gj=B()+500,fg&&jg())}
function Dk(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===Q?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Ek.bind(null,a)):hg(Ek.bind(null,a)),Jf(function(){0===(K&6)&&jg()}),c=null;else{switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc}c=Fk(c,Gk.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
function Gk(a,b){Ak=-1;Bk=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Hk()&&a.callbackNode!==c)return null;var d=uc(a,a===Q?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Ik(a,d);else{b=d;var e=K;K|=2;var f=Jk();if(Q!==a||Z!==b)uk=null,Gj=B()+500,Kk(a,b);do try{Lk();break}catch(h){Mk(a,h)}while(1);$g();mk.current=f;K=e;null!==Y?b=0:(Q=null,Z=0,b=T)}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Nk(a,e)));if(1===b)throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;if(6===b)Ck(a,d);
else{e=a.current.alternate;if(0===(d&30)&&!Ok(e)&&(b=Ik(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Nk(a,f))),1===b))throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Pk(a,tk,uk);break;case 3:Ck(a,d);if((d&130023424)===d&&(b=fk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){R();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),b);break}Pk(a,tk,uk);break;case 4:Ck(a,d);if((d&4194240)===
d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),d);break}Pk(a,tk,uk);break;case 5:Pk(a,tk,uk);break;default:throw Error(p(329));}}}Dk(a,B());return a.callbackNode===c?Gk.bind(null,a):null}
function Nk(a,b){var c=sk;a.current.memoizedState.isDehydrated&&(Kk(a,b).flags|=256);a=Ik(a,b);2!==a&&(b=tk,tk=c,null!==b&&Fj(b));return a}function Fj(a){null===tk?tk=a:tk.push.apply(tk,a)}
function Ok(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
function Ck(a,b){b&=~rk;b&=~qk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d}}function Ek(a){if(0!==(K&6))throw Error(p(327));Hk();var b=uc(a,0);if(0===(b&1))return Dk(a,B()),null;var c=Ik(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Nk(a,d))}if(1===c)throw c=pk,Kk(a,0),Ck(a,b),Dk(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Pk(a,tk,uk);Dk(a,B());return null}
function Qk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Gj=B()+500,fg&&jg())}}function Rk(a){null!==wk&&0===wk.tag&&0===(K&6)&&Hk();var b=K;K|=1;var c=ok.transition,d=C;try{if(ok.transition=null,C=1,a)return a()}finally{C=d,ok.transition=c,K=b,0===(K&6)&&jg()}}function Hj(){fj=ej.current;E(ej)}
function Kk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:zh();E(Wf);E(H);Eh();break;case 5:Bh(d);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(d.type._context);break;case 22:case 23:Hj()}c=c.return}Q=a;Y=a=Pg(a.current,null);Z=fj=b;T=0;pk=null;rk=qk=rh=0;tk=sk=null;if(null!==fh){for(b=
0;b<fh.length;b++)if(c=fh[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}fh=null}return a}
function Mk(a,b){do{var c=Y;try{$g();Fh.current=Rh;if(Ih){for(var d=M.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ih=!1}Hh=0;O=N=M=null;Jh=!1;Kh=0;nk.current=null;if(null===c||null===c.return){T=1;pk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Ui(g);if(null!==y){y.flags&=-257;Vi(y,g,h,f,b);y.mode&1&&Si(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t}else n.add(k);break a}else{if(0===(b&1)){Si(f,l,b);tj();break a}k=Error(p(426))}}else if(I&&h.mode&1){var J=Ui(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Vi(J,g,h,f,b);Jg(Ji(k,h));break a}}f=k=Ji(k,h);4!==T&&(T=2);null===sk?sk=[f]:sk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
b&=-b;f.lanes|=b;var x=Ni(f,k,b);ph(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ri||!Ri.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Qi(f,h,b);ph(f,F);break a}}f=f.return}while(null!==f)}Sk(c)}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Jk(){var a=mk.current;mk.current=Rh;return null===a?Rh:a}
function tj(){if(0===T||3===T||2===T)T=4;null===Q||0===(rh&268435455)&&0===(qk&268435455)||Ck(Q,Z)}function Ik(a,b){var c=K;K|=2;var d=Jk();if(Q!==a||Z!==b)uk=null,Kk(a,b);do try{Tk();break}catch(e){Mk(a,e)}while(1);$g();K=c;mk.current=d;if(null!==Y)throw Error(p(261));Q=null;Z=0;return T}function Tk(){for(;null!==Y;)Uk(Y)}function Lk(){for(;null!==Y&&!cc();)Uk(Y)}function Uk(a){var b=Vk(a.alternate,a,fj);a.memoizedProps=a.pendingProps;null===b?Sk(a):Y=b;nk.current=null}
function Sk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Ej(c,b,fj),null!==c){Y=c;return}}else{c=Ij(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===T&&(T=5)}function Pk(a,b,c){var d=C,e=ok.transition;try{ok.transition=null,C=1,Wk(a,b,c,d)}finally{ok.transition=e,C=d}return null}
function Wk(a,b,c,d){do Hk();while(null!==wk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===Q&&(Y=Q=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||vk||(vk=!0,Fk(hc,function(){Hk();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ok.transition;ok.transition=null;
var g=C;C=1;var h=K;K|=4;nk.current=null;Oj(a,c);dk(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;hk(c,a,e);dc();K=h;C=g;ok.transition=f}else a.current=c;vk&&(vk=!1,wk=a,xk=e);f=a.pendingLanes;0===f&&(Ri=null);mc(c.stateNode,d);Dk(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Oi)throw Oi=!1,a=Pi,Pi=null,a;0!==(xk&1)&&0!==a.tag&&Hk();f=a.pendingLanes;0!==(f&1)?a===zk?yk++:(yk=0,zk=a):yk=0;jg();return null}
function Hk(){if(null!==wk){var a=Dc(xk),b=ok.transition,c=C;try{ok.transition=null;C=16>a?16:a;if(null===wk)var d=!1;else{a=wk;wk=null;xk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Pj(8,m,f)}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Sj(m);if(m===
l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J}while(null!==t)}}V=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Pj(9,f,f.return)}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Qj(9,h)}}catch(na){W(h,h.return,na)}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a)}catch(na){}d=!0}return d}finally{C=c,ok.transition=b}}return!1}function Xk(a,b,c){b=Ji(c,b);b=Ni(a,b,1);a=nh(a,b,1);b=R();null!==a&&(Ac(a,1,b),Dk(a,b))}
function W(a,b,c){if(3===a.tag)Xk(a,a,c);else for(;null!==b;){if(3===b.tag){Xk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ri||!Ri.has(d))){a=Ji(c,a);a=Qi(b,a,1);b=nh(b,a,1);a=R();null!==b&&(Ac(b,1,a),Dk(b,a));break}}b=b.return}}
function Ti(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=R();a.pingedLanes|=a.suspendedLanes&c;Q===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-fk?Kk(a,0):rk|=c);Dk(a,b)}function Yk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=R();a=ih(a,b);null!==a&&(Ac(a,b,c),Dk(a,c))}function uj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Yk(a,c)}
function bk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Yk(a,c)}var Vk;
Vk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)dh=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return dh=!1,yj(a,b,c);dh=0!==(a.flags&131072)?!0:!1}else dh=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;ij(a,b);a=b.pendingProps;var e=Yf(b,H.current);ch(b,c);e=Nh(null,b,d,a,e,c);var f=Sh();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,kh(b),e.updater=Ei,b.stateNode=e,e._reactInternals=b,Ii(b,d,a,c),b=jj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Xi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{ij(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Zk(d);a=Ci(d,a);switch(e){case 0:b=cj(null,b,d,a,c);break a;case 1:b=hj(null,b,d,a,c);break a;case 11:b=Yi(null,b,d,a,c);break a;case 14:b=$i(null,b,d,Ci(d.type,a),c);break a}throw Error(p(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),cj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),hj(a,b,d,e,c);case 3:a:{kj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;lh(a,b);qh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ji(Error(p(423)),b);b=lj(a,b,d,c,e);break a}else if(d!==e){e=Ji(Error(p(424)),b);b=lj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Vg(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ig();if(d===e){b=Zi(a,b,c);break a}Xi(a,b,d,c)}b=b.child}return b;case 5:return Ah(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
gj(a,b),Xi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return oj(a,b,c);case 4:return yh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Ug(b,null,d,c):Xi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),Yi(a,b,d,e,c);case 7:return Xi(a,b,b.pendingProps,c),b.child;case 8:return Xi(a,b,b.pendingProps.children,c),b.child;case 12:return Xi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;G(Wg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=Zi(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=mh(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bh(f.return,
c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bh(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}Xi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,ch(b,c),e=eh(e),d=d(e),b.flags|=1,Xi(a,b,d,c),
b.child;case 14:return d=b.type,e=Ci(d,b.pendingProps),e=Ci(d.type,e),$i(a,b,d,e,c);case 15:return bj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),ij(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,ch(b,c),Gi(b,d,e),Ii(b,d,e,c),jj(null,b,d,!0,a,c);case 19:return xj(a,b,c);case 22:return dj(a,b,c)}throw Error(p(156,b.tag));};function Fk(a,b){return ac(a,b)}
function $k(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function Bg(a,b,c,d){return new $k(a,b,c,d)}function aj(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function Zk(a){if("function"===typeof a)return aj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
function Pg(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Rg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)aj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Tg(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return pj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Tg(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function pj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function Qg(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
function Sg(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function al(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
null}function bl(a,b,c,d,e,f,g,h,k){a=new al(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};kh(f);return a}function cl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function dl(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
function el(a,b,c,d,e,f,g,h,k){a=bl(c,d,!0,a,e,f,g,h,k);a.context=dl(null);c=a.current;d=R();e=yi(c);f=mh(d,e);f.callback=void 0!==b&&null!==b?b:null;nh(c,f,e);a.current.lanes=e;Ac(a,e,d);Dk(a,d);return a}function fl(a,b,c,d){var e=b.current,f=R(),g=yi(e);c=dl(c);null===b.context?b.context=c:b.pendingContext=c;b=mh(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=nh(e,b,g);null!==a&&(gi(a,e,g,f),oh(a,e,g));return g}
function gl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function hl(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function il(a,b){hl(a,b);(a=a.alternate)&&hl(a,b)}function jl(){return null}var kl="function"===typeof reportError?reportError:function(a){console.error(a)};function ll(a){this._internalRoot=a}
ml.prototype.render=ll.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));fl(a,b,null,null)};ml.prototype.unmount=ll.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Rk(function(){fl(null,a,null,null)});b[uf]=null}};function ml(a){this._internalRoot=a}
ml.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a)}};function nl(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function ol(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function pl(){}
function ql(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=gl(g);f.call(a)}}var g=el(b,d,a,0,null,!1,!1,"",pl);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Rk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=gl(k);h.call(a)}}var k=bl(a,0,!1,null,null,!1,!1,"",pl);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Rk(function(){fl(b,k,c,d)});return k}
function rl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=gl(g);h.call(a)}}fl(b,g,a,e)}else g=ql(c,b,a,e,d);return gl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Dk(b,B()),0===(K&6)&&(Gj=B()+500,jg()))}break;case 13:Rk(function(){var b=ih(a,1);if(null!==b){var c=R();gi(b,a,1,c)}}),il(a,1)}};
Fc=function(a){if(13===a.tag){var b=ih(a,134217728);if(null!==b){var c=R();gi(b,a,134217728,c)}il(a,134217728)}};Gc=function(a){if(13===a.tag){var b=yi(a),c=ih(a,b);if(null!==c){var d=R();gi(c,a,b,d)}il(a,b)}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};
yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Qk;Hb=Rk;
var sl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"};
var ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||
jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;
exports.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nl(b))throw Error(p(200));return cl(a,b,null,c)};exports.createRoot=function(a,b){if(!nl(a))throw Error(p(299));var c=!1,d="",e=kl;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=bl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ll(b)};
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a){return Rk(a)};exports.hydrate=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!0,c)};
exports.hydrateRoot=function(a,b,c){if(!nl(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=kl;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=el(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
e);return new ml(b)};exports.render=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!ol(a))throw Error(p(40));return a._reactRootContainer?(Rk(function(){rl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null})}),!0):!1};exports.unstable_batchedUpdates=Qk;
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!ol(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return rl(a,b,c,!1,d)};exports.version="18.3.1-next-f1338f8080-20240426";


/***/ },

/***/ 5338
(__unused_webpack_module, exports, __webpack_require__) {



var m = __webpack_require__(961);
if (true) {
  exports.createRoot = m.createRoot;
  exports.hydrateRoot = m.hydrateRoot;
} else // removed by dead control flow
{ var i; }


/***/ },

/***/ 961
(module, __unused_webpack_exports, __webpack_require__) {



function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) // removed by dead control flow
{}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(2551);
} else // removed by dead control flow
{}


/***/ },

/***/ 1020
(__unused_webpack_module, exports, __webpack_require__) {

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(6540),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ },

/***/ 5287
(__unused_webpack_module, exports) {

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};function X(){throw Error("act(...) is not supported in production builds of React.");}
exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;exports.act=X;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=X;exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};
exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};
exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};exports.useTransition=function(){return U.current.useTransition()};exports.version="18.3.1";


/***/ },

/***/ 6540
(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(5287);
} else // removed by dead control flow
{}


/***/ },

/***/ 4848
(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(1020);
} else // removed by dead control flow
{}


/***/ },

/***/ 7463
(__unused_webpack_module, exports) {

/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};


/***/ },

/***/ 9982
(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(7463);
} else // removed by dead control flow
{}


/***/ },

/***/ 8577
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = App;
const jsx_runtime_1 = __webpack_require__(4848);
const AppShell_1 = __importDefault(__webpack_require__(7664));
function App() {
    return (0, jsx_runtime_1.jsx)(AppShell_1.default, {});
}


/***/ },

/***/ 5449
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.GEMINI_MODEL = void 0;
exports.getRecentGeminiCalls = getRecentGeminiCalls;
exports.getGeminiUsageStats = getGeminiUsageStats;
exports.getGeminiRuntimeStatus = getGeminiRuntimeStatus;
exports.runGeminiStructured = runGeminiStructured;
exports.runGeminiTool = runGeminiTool;
exports.runGemini = runGemini;
exports.runGeminiVision = runGeminiVision;
const generative_ai_1 = __webpack_require__(6445);
const config_1 = __webpack_require__(7028);
const loggerService_1 = __webpack_require__(2954);
const schemas_1 = __webpack_require__(8156);
exports.GEMINI_MODEL = "gemini-3.6-flash";
const MAX_USAGE_RECORDS = 20;
const FALLBACK_MODELS = [
    "gemini-3.5-flash",
    "gemini-flash-latest"
];
const RETRY_DELAYS_MS = [350, 900, 1800];
const responseCache = new Map();
let cacheHits = 0;
let lastGeminiError = "";
let lastQuotaMessage = "";
let client = null;
let cachedApiKey = "";
let resolvedModel = null;
let warnedFallback = false;
const usageRecords = [];
function getRecentGeminiCalls() {
    return [...usageRecords].reverse();
}
function getGeminiUsageStats() {
    const totalCalls = usageRecords.length;
    const successfulCalls = usageRecords.filter((record) => record.success).length;
    const failedCalls = totalCalls - successfulCalls;
    const totalDurationMs = usageRecords.reduce((sum, record) => sum + record.durationMs, 0);
    return {
        totalCalls,
        successfulCalls,
        failedCalls,
        averageDurationMs: totalCalls > 0 ? Math.round(totalDurationMs / totalCalls) : 0,
        cacheHits
    };
}
function getGeminiRuntimeStatus() {
    return {
        cacheEntries: responseCache.size,
        cacheHits,
        lastError: lastGeminiError,
        lastQuotaMessage
    };
}
async function runGeminiStructured(prompt, schema, options = {}) {
    const apiKey = (0, config_1.resolveGeminiConfig)().apiKey;
    if (!apiKey) {
        throw new Error("Add your Gemini API key in Settings.");
    }
    const modelName = await resolveModel(apiKey, {
        json: true,
        systemInstruction: options.systemInstruction
    });
    const cacheKey = buildCacheKey("text", modelName, buildContextualPrompt(prompt, options.context), options.systemInstruction, [`responseSchema:${JSON.stringify(schema)}`]);
    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse) {
        cacheHits += 1;
        return (0, schemas_1.validateSchemaValue)(JSON.parse(cachedResponse), schema);
    }
    const model = getClient(apiKey).getGenerativeModel({
        model: modelName,
        systemInstruction: options.systemInstruction,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema
        }
    });
    const result = await model.generateContent(buildContextualPrompt(prompt, options.context));
    const response = await result.response;
    const text = response.text().trim();
    if (!text) {
        throw new Error("Gemini returned an empty structured response.");
    }
    responseCache.set(cacheKey, text);
    return (0, schemas_1.validateSchemaValue)(JSON.parse(text), schema);
}
async function runGeminiTool(prompt, toolSchemas, context, options = {}) {
    const apiKey = (0, config_1.resolveGeminiConfig)().apiKey;
    if (!apiKey) {
        throw new Error("Add your Gemini API key in Settings.");
    }
    if (toolSchemas.length === 0) {
        throw new Error("runGeminiTool requires at least one tool schema.");
    }
    const modelName = await resolveModel(apiKey, options);
    const fullPrompt = buildContextualPrompt(prompt, context);
    const cacheKey = buildCacheKey("text", modelName, fullPrompt, options.systemInstruction, [`tools:${JSON.stringify(toolSchemas)}`]);
    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse) {
        cacheHits += 1;
        return JSON.parse(cachedResponse);
    }
    const declarations = toolSchemas.map(schemas_1.toFunctionDeclaration);
    const model = getClient(apiKey).getGenerativeModel({
        model: modelName,
        systemInstruction: options.systemInstruction,
        tools: [{ functionDeclarations: declarations }],
        toolConfig: {
            functionCallingConfig: {
                mode: generative_ai_1.FunctionCallingMode.ANY,
                allowedFunctionNames: toolSchemas.map((tool) => tool.name)
            }
        }
    });
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const functionCalls = response.functionCalls();
    const firstCall = functionCalls?.[0];
    if (!firstCall) {
        throw new Error("Gemini did not return a function call.");
    }
    const schema = toolSchemas.find((tool) => tool.name === firstCall.name);
    if (!schema) {
        throw new Error(`Gemini returned an unknown function call: ${firstCall.name}`);
    }
    const validatedArgs = (0, schemas_1.validateSchemaValue)(firstCall.args, {
        type: schema.parameters?.type ?? "object",
        properties: schema.parameters?.properties ?? {},
        required: schema.parameters?.required
    });
    const payload = { name: firstCall.name, args: validatedArgs };
    responseCache.set(cacheKey, JSON.stringify(payload));
    return payload;
}
async function runGemini(prompt, options = {}) {
    const apiKey = (0, config_1.resolveGeminiConfig)().apiKey;
    const startedAt = Date.now();
    if (!apiKey) {
        throw new Error("Add your Gemini API key in Settings.");
    }
    const modelName = await resolveModel(apiKey, options);
    const cacheKey = buildCacheKey("text", modelName, prompt, options.systemInstruction, []);
    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse) {
        cacheHits += 1;
        trackUsage({
            kind: "text",
            model: modelName,
            prompt,
            startedAt,
            success: true,
            responseText: cachedResponse,
            cacheHit: true
        });
        loggerService_1.loggerService.log(`Gemini text request served from session cache for model ${modelName}.`, "info");
        return cachedResponse;
    }
    loggerService_1.loggerService.log(`Gemini text request started with model ${modelName}.`, "info");
    let lastError;
    for (let attempt = 0; attempt < RETRY_DELAYS_MS.length + 1; attempt += 1) {
        try {
            const model = getClient(apiKey).getGenerativeModel({
                model: modelName,
                systemInstruction: options.systemInstruction,
                generationConfig: options.json
                    ? { responseMimeType: "application/json" }
                    : undefined
            });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().trim();
            if (!text) {
                throw new Error("Gemini returned an empty response.");
            }
            responseCache.set(cacheKey, text);
            trackUsage({
                kind: "text",
                model: modelName,
                prompt,
                startedAt,
                success: true,
                responseText: text,
                cacheHit: false
            });
            lastGeminiError = "";
            lastQuotaMessage = "";
            loggerService_1.loggerService.log(`Gemini text request completed in ${Date.now() - startedAt} ms.`, "success");
            return text;
        }
        catch (error) {
            lastError = error;
            if (attempt >= RETRY_DELAYS_MS.length || !isRetryableError(error)) {
                break;
            }
            await delay(RETRY_DELAYS_MS[attempt]);
        }
    }
    trackUsage({
        kind: "text",
        model: modelName,
        prompt,
        startedAt,
        success: false,
        error: lastError,
        cacheHit: false
    });
    lastGeminiError = formatGeminiError(lastError);
    lastQuotaMessage = formatQuotaMessage(lastError);
    loggerService_1.loggerService.log(`Gemini text request failed: ${formatGeminiError(lastError)}`, "error");
    throw new Error(formatGeminiError(lastError));
}
async function runGeminiVision(prompt, images, options = {}) {
    const apiKey = (0, config_1.resolveGeminiConfig)().apiKey;
    const startedAt = Date.now();
    if (!apiKey) {
        throw new Error("Add your Gemini API key in Settings.");
    }
    if (images.length === 0) {
        throw new Error("Gemini vision request requires at least one image.");
    }
    const modelName = await resolveModel(apiKey, options);
    const cacheKey = buildCacheKey("vision", modelName, prompt, options.systemInstruction, images.map((image) => `${image.mimeType}:${image.base64.slice(0, 32)}`));
    const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse) {
        cacheHits += 1;
        trackUsage({
            kind: "vision",
            model: modelName,
            prompt,
            startedAt,
            success: true,
            responseText: cachedResponse,
            cacheHit: true
        });
        loggerService_1.loggerService.log(`Gemini vision request served from session cache for model ${modelName}.`, "info");
        return cachedResponse;
    }
    loggerService_1.loggerService.log(`Gemini vision request started with model ${modelName}.`, "info");
    let lastError;
    for (let attempt = 0; attempt < RETRY_DELAYS_MS.length + 1; attempt += 1) {
        try {
            const model = getClient(apiKey).getGenerativeModel({
                model: modelName,
                systemInstruction: options.systemInstruction,
                generationConfig: options.json
                    ? { responseMimeType: "application/json" }
                    : undefined
            });
            const result = await model.generateContent([
                { text: prompt },
                ...images.map((image) => ({
                    inlineData: {
                        mimeType: image.mimeType,
                        data: image.base64
                    }
                }))
            ]);
            const response = await result.response;
            const text = response.text().trim();
            if (!text) {
                throw new Error("Gemini returned an empty vision response.");
            }
            responseCache.set(cacheKey, text);
            trackUsage({
                kind: "vision",
                model: modelName,
                prompt,
                startedAt,
                success: true,
                responseText: text,
                cacheHit: false
            });
            lastGeminiError = "";
            lastQuotaMessage = "";
            loggerService_1.loggerService.log(`Gemini vision request completed in ${Date.now() - startedAt} ms.`, "success");
            return text;
        }
        catch (error) {
            lastError = error;
            if (attempt >= RETRY_DELAYS_MS.length || !isRetryableError(error)) {
                break;
            }
            await delay(RETRY_DELAYS_MS[attempt]);
        }
    }
    trackUsage({
        kind: "vision",
        model: modelName,
        prompt,
        startedAt,
        success: false,
        error: lastError,
        cacheHit: false
    });
    lastGeminiError = formatGeminiError(lastError);
    lastQuotaMessage = formatQuotaMessage(lastError);
    loggerService_1.loggerService.log(`Gemini vision request failed: ${formatGeminiError(lastError)}`, "error");
    throw new Error(formatGeminiError(lastError));
}
function trackUsage({ kind, model, prompt, startedAt, success, error, responseText, cacheHit }) {
    usageRecords.push({
        id: `${startedAt}-${usageRecords.length + 1}`,
        kind,
        model,
        cacheHit,
        promptText: prompt,
        promptPreview: summarizeText(prompt),
        startedAt: new Date(startedAt).toISOString(),
        durationMs: Math.max(0, Date.now() - startedAt),
        success,
        errorMessage: error ? formatGeminiError(error) : undefined,
        responseText,
        responsePreview: responseText ? summarizeText(responseText) : undefined
    });
    if (usageRecords.length > MAX_USAGE_RECORDS) {
        usageRecords.splice(0, usageRecords.length - MAX_USAGE_RECORDS);
    }
}
function buildCacheKey(kind, model, prompt, systemInstruction, extra) {
    return JSON.stringify({
        kind,
        model,
        prompt,
        systemInstruction: systemInstruction ?? "",
        extra
    });
}
function buildContextualPrompt(prompt, context) {
    if (context === undefined) {
        return prompt;
    }
    return [prompt, "", "Context JSON:", JSON.stringify(context)].join("\n");
}
function getClient(apiKey) {
    if (client === null || cachedApiKey !== apiKey) {
        client = new generative_ai_1.GoogleGenerativeAI(apiKey);
        cachedApiKey = apiKey;
        resolvedModel = null;
        warnedFallback = false;
    }
    return client;
}
async function resolveModel(apiKey, options) {
    if (resolvedModel) {
        return resolvedModel;
    }
    const candidates = [exports.GEMINI_MODEL, ...FALLBACK_MODELS];
    for (const candidate of candidates) {
        try {
            const model = getClient(apiKey).getGenerativeModel({
                model: candidate,
                systemInstruction: options.systemInstruction,
                generationConfig: options.json
                    ? { responseMimeType: "application/json" }
                    : undefined
            });
            const result = await model.generateContent("Reply with OK.");
            const response = await result.response;
            if (!response.text().trim()) {
                throw new Error(`Model ${candidate} returned an empty response.`);
            }
            resolvedModel = candidate;
            if (candidate !== exports.GEMINI_MODEL && !warnedFallback) {
                warnedFallback = true;
                console.warn(`[RK Flow] Gemini model "${exports.GEMINI_MODEL}" was not resolvable for this API key. Falling back to "${candidate}".`);
            }
            return candidate;
        }
        catch (error) {
            if (!isModelResolutionError(error)) {
                throw error;
            }
        }
    }
    throw new Error(`Gemini model "${exports.GEMINI_MODEL}" is not available for this API key, and no fallback flash model resolved.`);
}
function isRetryableError(error) {
    const message = extractErrorMessage(error).toLowerCase();
    return (message.includes("429") ||
        message.includes("500") ||
        message.includes("502") ||
        message.includes("503") ||
        message.includes("504") ||
        message.includes("rate limit") ||
        message.includes("timeout"));
}
function isModelResolutionError(error) {
    const message = extractErrorMessage(error).toLowerCase();
    return (message.includes("404") ||
        message.includes("not found") ||
        message.includes("unsupported") ||
        message.includes("not available") ||
        message.includes("not exist"));
}
function formatGeminiError(error) {
    const message = extractErrorMessage(error);
    if (isRateLimitError(error)) {
        return formatQuotaMessage(error);
    }
    if (message) {
        return `Gemini request failed: ${message}`;
    }
    return "Gemini request failed for an unknown reason.";
}
function formatQuotaMessage(error) {
    const message = extractErrorMessage(error);
    const retryAfter = extractRetryAfterSeconds(message);
    const suffix = retryAfter !== null ? ` Try again in about ${retryAfter}s.` : " Try again later.";
    return `Gemini daily limit reached or rate limit hit.${suffix}`;
}
function extractErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return "";
}
function isRateLimitError(error) {
    const message = extractErrorMessage(error).toLowerCase();
    return message.includes("429") || message.includes("rate limit") || message.includes("quota");
}
function extractRetryAfterSeconds(message) {
    const match = message.match(/(\d+)\s*s(?:ec(?:ond)?s?)?/i);
    if (!match) {
        return null;
    }
    const seconds = Number(match[1]);
    return Number.isFinite(seconds) ? seconds : null;
}
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function summarizeText(value) {
    const normalized = value.replace(/\s+/g, " ").trim();
    return normalized.length > 220 ? `${normalized.slice(0, 217)}...` : normalized;
}


/***/ },

/***/ 5989
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AI_PROVIDERS = void 0;
exports.AI_PROVIDERS = [
    {
        id: "gemini",
        label: "Google Gemini",
        enabled: true,
    },
    {
        id: "chatgpt",
        label: "ChatGPT",
        enabled: false,
    },
    {
        id: "claude",
        label: "Claude",
        enabled: false,
    },
    {
        id: "grok",
        label: "Grok",
        enabled: false,
    },
    {
        id: "kimi",
        label: "Kimi",
        enabled: false,
    },
    {
        id: "ollama",
        label: "Ollama",
        enabled: false,
    }
];


/***/ },

/***/ 6441
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmptyPremiereContext = void 0;
exports.EmptyPremiereContext = {
    projectName: "",
    sequenceName: "",
    fps: 25,
    inPoint: 0,
    outPoint: 0,
    playhead: 0,
    selectedClips: [],
    videoTracks: 0,
    audioTracks: 0,
    markers: []
};


/***/ },

/***/ 7198
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PremiereContextManager = void 0;
const PremiereContext_1 = __webpack_require__(6441);
class PremiereContextManager {
    static context = {
        ...PremiereContext_1.EmptyPremiereContext
    };
    static get() {
        return this.context;
    }
    static update(data) {
        this.context = {
            ...this.context,
            ...data
        };
        return this.context;
    }
    static reset() {
        this.context = {
            ...PremiereContext_1.EmptyPremiereContext
        };
    }
}
exports.PremiereContextManager = PremiereContextManager;


/***/ },

/***/ 9788
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PremiereContextProvider = void 0;
const PremiereContextManager_1 = __webpack_require__(7198);
const PremiereReader_1 = __webpack_require__(611);
class PremiereContextProvider {
    static reader = new PremiereReader_1.PremiereReader();
    static async refresh() {
        const context = await this.reader.readContext();
        PremiereContextManager_1.PremiereContextManager.update(context);
    }
}
exports.PremiereContextProvider = PremiereContextProvider;


/***/ },

/***/ 6134
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PremiereContextSnapshotService = void 0;
const PremiereContextManager_1 = __webpack_require__(7198);
const PremiereReader_1 = __webpack_require__(611);
class PremiereContextSnapshotService {
    reader = new PremiereReader_1.PremiereReader();
    async capture() {
        const context = await this.reader.readContext();
        PremiereContextManager_1.PremiereContextManager.update(context);
        return {
            projectName: context.projectName,
            sequenceName: context.sequenceName,
            fps: context.fps,
            playhead: context.playhead,
            inPoint: context.inPoint,
            outPoint: context.outPoint,
            videoTracks: context.videoTracks,
            audioTracks: context.audioTracks,
            selectedClips: [...context.selectedClips],
            selectedClipCount: context.selectedClips.length,
            markers: [...context.markers]
        };
    }
}
exports.PremiereContextSnapshotService = PremiereContextSnapshotService;


/***/ },

/***/ 7523
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(6441), exports);
__exportStar(__webpack_require__(7198), exports);
__exportStar(__webpack_require__(9788), exports);
__exportStar(__webpack_require__(6134), exports);


/***/ },

/***/ 318
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AICopilot = void 0;
const brain_1 = __webpack_require__(7021);
const loggerService_1 = __webpack_require__(2954);
const context_1 = __webpack_require__(7523);
const GeminiService_1 = __webpack_require__(5449);
class AICopilot {
    memory = new brain_1.MemoryEngine();
    snapshotService = new context_1.PremiereContextSnapshotService();
    async resolve({ intent, context, memoryScopeKey, memoryCacheKey = "result", skipMemory = false, localResolver, geminiResolver }) {
        const snapshot = await this.snapshotService.capture();
        if (!skipMemory && memoryScopeKey) {
            const cached = this.memory.getAnalysis(memoryScopeKey, memoryCacheKey);
            if (cached !== null) {
                loggerService_1.loggerService.log(`[memory] AICopilot resolved ${intent}.`, "info");
                return { value: cached, path: "memory", snapshot };
            }
        }
        if (localResolver) {
            const local = await localResolver(snapshot, context);
            if (local !== null && local !== undefined) {
                if (memoryScopeKey) {
                    this.memory.setAnalysis(memoryScopeKey, memoryCacheKey, local);
                }
                loggerService_1.loggerService.log(`[local] AICopilot resolved ${intent}.`, "info");
                return { value: local, path: "local", snapshot };
            }
        }
        const before = (0, GeminiService_1.getGeminiUsageStats)().cacheHits;
        const value = await geminiResolver(snapshot, context);
        const after = (0, GeminiService_1.getGeminiUsageStats)().cacheHits;
        const path = after > before ? "cache" : "gemini";
        if (memoryScopeKey) {
            this.memory.setAnalysis(memoryScopeKey, memoryCacheKey, value);
        }
        loggerService_1.loggerService.log(`[${path}] AICopilot resolved ${intent}.`, path === "gemini" ? "warn" : "info");
        return { value, path, snapshot };
    }
}
exports.AICopilot = AICopilot;


/***/ },

/***/ 611
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.PremiereReader = void 0;
const PremiereAPI_1 = __webpack_require__(868);
const ClipManager_1 = __webpack_require__(2276);
class PremiereReader {
    async readContext() {
        const sequence = await PremiereAPI_1.premiereAPI.getActiveSequence();
        const timeline = await PremiereAPI_1.premiereAPI.getTimelineContext();
        const clips = await ClipManager_1.clipManager.getSelectedClips();
        const playhead = sequence
            ? await sequence.getPlayerPosition()
            : null;
        const inPoint = sequence
            ? await sequence.getInPoint()
            : null;
        const outPoint = sequence
            ? await sequence.getOutPoint()
            : null;
        return {
            projectName: timeline?.projectName ?? "No Project",
            sequenceName: timeline?.sequenceName ?? "No Sequence",
            fps: 25,
            playhead: playhead?.seconds ?? 0,
            inPoint: inPoint?.seconds === -400000
                ? 0
                : (inPoint?.seconds ?? 0),
            outPoint: outPoint?.seconds === -400000
                ? 0
                : (outPoint?.seconds ?? 0),
            videoTracks: timeline?.videoTracks ?? 0,
            audioTracks: timeline?.audioTracks ?? 0,
            selectedClips: clips.map(c => c.name),
            markers: []
        };
    }
}
exports.PremiereReader = PremiereReader;


/***/ },

/***/ 8224
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.BaseProvider = void 0;
class BaseProvider {
    async initialize(_apiKey) { }
    isAvailable() {
        return true;
    }
    async chat(request) {
        return {
            text: request.prompt,
            provider: this.id
        };
    }
}
exports.BaseProvider = BaseProvider;


/***/ },

/***/ 3150
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.GeminiProvider = void 0;
const BaseProvider_1 = __webpack_require__(8224);
const GeminiService_1 = __webpack_require__(5449);
class GeminiProvider extends BaseProvider_1.BaseProvider {
    id = "gemini";
    name = "Gemini";
    async initialize(_apiKey) { }
    async chat(request) {
        const text = await (0, GeminiService_1.runGemini)(request.prompt, {
            systemInstruction: request.systemPrompt
        });
        return {
            text,
            provider: this.id,
            usage: {
                promptTokens: 0,
                completionTokens: 0,
                totalTokens: 0
            }
        };
    }
}
exports.GeminiProvider = GeminiProvider;
__webpack_unused_export__ = GeminiProvider;


/***/ },

/***/ 1103
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ProviderFactory = void 0;
const GeminiProvider_1 = __webpack_require__(3150);
class DisabledProvider {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    async initialize() {
        throw new Error(`${this.name} is not yet configured in RK Flow Settings.`);
    }
    async chat() {
        throw new Error(`${this.name} is coming soon. Only Gemini is active right now.`);
    }
    isAvailable() {
        return false;
    }
}
class ProviderFactory {
    static create(provider) {
        switch (provider) {
            case "gemini":
                return new GeminiProvider_1.GeminiProvider();
            case "chatgpt":
                return new DisabledProvider("chatgpt", "ChatGPT");
            case "claude":
                return new DisabledProvider("claude", "Claude");
            case "grok":
                return new DisabledProvider("grok", "Grok");
            case "kimi":
                return new DisabledProvider("kimi", "Kimi");
            case "ollama":
                return new DisabledProvider("ollama", "Ollama");
            default:
                throw new Error(`Unsupported provider: ${provider}`);
        }
    }
    static providers() {
        return ["gemini", "chatgpt", "claude", "grok", "kimi", "ollama"];
    }
}
exports.ProviderFactory = ProviderFactory;


/***/ },

/***/ 8026
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AIRouter = void 0;
const ProviderFactory_1 = __webpack_require__(1103);
class AIRouter {
    async chat(request) {
        const provider = ProviderFactory_1.ProviderFactory.create("gemini");
        await provider.initialize("");
        return provider.chat(request);
    }
}
exports.AIRouter = AIRouter;


/***/ },

/***/ 2822
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commandToolSchemas = void 0;
const generative_ai_1 = __webpack_require__(6445);
const stringField = { type: generative_ai_1.SchemaType.STRING };
const numberField = { type: generative_ai_1.SchemaType.NUMBER };
exports.commandToolSchemas = [
    {
        name: "READ_TIMELINE",
        description: "Read the active Premiere timeline.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: {} }
    },
    {
        name: "READ_SELECTED_CLIPS",
        description: "Read selected clips from the active Premiere sequence.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: {} }
    },
    {
        name: "GET_IN_OUT",
        description: "Read current In and Out points.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: {} }
    },
    {
        name: "GET_PLAYHEAD",
        description: "Read current playhead position.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: {} }
    },
    {
        name: "MOVE_PLAYHEAD",
        description: "Move the playhead to a given time in seconds.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { time: numberField }, required: ["time"] }
    },
    {
        name: "CREATE_MARKER",
        description: "Create a timeline marker.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { name: stringField, time: numberField }, required: ["name", "time"] }
    },
    {
        name: "DELETE_MARKER",
        description: "Delete a marker by id.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { markerId: stringField }, required: ["markerId"] }
    },
    {
        name: "CUT_CLIP",
        description: "Cut a clip at a given time.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField, time: numberField }, required: ["clipId", "time"] }
    },
    {
        name: "TRIM_CLIP",
        description: "Trim a clip to a start and end time.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField, start: numberField, end: numberField }, required: ["clipId", "start", "end"] }
    },
    {
        name: "MOVE_CLIP",
        description: "Move a clip to another track/time.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField, targetTrackIndex: numberField, start: numberField }, required: ["clipId", "targetTrackIndex", "start"] }
    },
    {
        name: "CREATE_SEQUENCE",
        description: "Create a Premiere sequence.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { name: stringField }, required: ["name"] }
    },
    {
        name: "IMPORT_MEDIA",
        description: "Import media into the project.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { mediaPath: stringField }, required: ["mediaPath"] }
    },
    {
        name: "EXPORT_SEQUENCE",
        description: "Export the active sequence.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { destinationPath: stringField, preset: stringField }, required: ["destinationPath"] }
    },
    {
        name: "CREATE_REEL",
        description: "Create a reel from the current context.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { duration: numberField }, required: ["duration"] }
    },
    {
        name: "RIPPLE_DELETE",
        description: "Ripple delete a timeline range.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { start: numberField, end: numberField }, required: ["start", "end"] }
    },
    {
        name: "AUTO_TRIM",
        description: "Automatically trim selected clips.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: {} }
    },
    {
        name: "BEAT_CUT",
        description: "Cut on detected beats.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: {} }
    },
    {
        name: "SILENCE_REMOVE",
        description: "Remove silence from selected clips.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: {} }
    },
    {
        name: "SPEED_RAMP",
        description: "Apply a speed ramp to a clip.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField, from: numberField, to: numberField }, required: ["clipId", "from", "to"] }
    },
    {
        name: "AUTO_ZOOM",
        description: "Apply auto zoom to a clip.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField, start: numberField, end: numberField }, required: ["clipId"] }
    },
    {
        name: "REFRAME",
        description: "Auto reframe a clip or sequence.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField } }
    },
    {
        name: "ADD_CLIP_TO_SEQUENCE",
        description: "Insert a video project item into the active sequence.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField, mediaPath: stringField, start: numberField, targetTrackIndex: numberField }, required: ["start"] }
    },
    {
        name: "ADD_AUDIO_TO_SEQUENCE",
        description: "Insert an audio project item into the active sequence.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField, mediaPath: stringField, assetId: stringField, start: numberField, targetTrackIndex: numberField }, required: ["start"] }
    },
    {
        name: "ADD_TRANSITION",
        description: "Add a transition to the timeline.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { type: stringField, start: numberField, duration: numberField }, required: ["type", "start", "duration"] }
    },
    {
        name: "APPLY_COLOR_MATCH",
        description: "Apply color match using source and target clips.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { sourceClipId: stringField, targetClipId: stringField }, required: ["sourceClipId", "targetClipId"] }
    },
    {
        name: "APPLY_SKIN_TONE_PROTECTION",
        description: "Apply skin tone protection.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "APPLY_FILM_LUT",
        description: "Apply a film LUT to a clip.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "AUTO_GRADE",
        description: "Auto grade a clip.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "APPLY_PAN_AND_ZOOM",
        description: "Apply pan and zoom motion.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "APPLY_PARALLAX",
        description: "Apply parallax motion.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "APPLY_MOTION_BLUR",
        description: "Apply motion blur.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "REMOVE_NOISE",
        description: "Remove noise from an audio clip.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "ENHANCE_VOICE",
        description: "Enhance voice in an audio clip.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "AUTO_DUCK",
        description: "Auto duck background music beneath speech.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { mainClipId: stringField, musicClipId: stringField }, required: ["mainClipId", "musicClipId"] }
    },
    {
        name: "CLEANUP_SPEECH",
        description: "Cleanup speech audio.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { clipId: stringField }, required: ["clipId"] }
    },
    {
        name: "INSERT_CAPTIONS",
        description: "Insert captions into the timeline.",
        parameters: { type: generative_ai_1.SchemaType.OBJECT, properties: { captions: stringField }, required: ["captions"] }
    }
];


/***/ },

/***/ 4534
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.aiDirectorToolSchemas = void 0;
const generative_ai_1 = __webpack_require__(6445);
const stringField = { type: generative_ai_1.SchemaType.STRING };
const numberField = { type: generative_ai_1.SchemaType.NUMBER };
const storySegmentSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        type: stringField,
        segment: stringField,
        clipId: stringField,
        duration: numberField,
        content: stringField
    },
    required: ["type", "duration"]
};
exports.aiDirectorToolSchemas = [
    {
        name: "SELECT_SONG",
        description: "Choose the best soundtrack for the wedding film from available audio assets.",
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {
                songId: stringField,
                reasoning: stringField
            },
            required: ["songId", "reasoning"]
        }
    },
    {
        name: "SELECT_HERO_SHOTS",
        description: "Select the strongest hero shots from available video assets.",
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {
                heroShotIds: {
                    type: generative_ai_1.SchemaType.ARRAY,
                    items: stringField
                },
                reasoning: stringField
            },
            required: ["heroShotIds", "reasoning"]
        }
    },
    {
        name: "BUILD_STORY_STRUCTURE",
        description: "Build a story structure for the film using hero shots and wedding beats.",
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {
                segments: {
                    type: generative_ai_1.SchemaType.ARRAY,
                    items: storySegmentSchema
                },
                reasoning: stringField
            },
            required: ["segments", "reasoning"]
        }
    },
    {
        name: "ASSEMBLE_SEQUENCE",
        description: "Submit the edit plan to Premiere for assembly once the structure is ready.",
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {
                templateName: stringField,
                clipIds: {
                    type: generative_ai_1.SchemaType.ARRAY,
                    items: stringField
                },
                reasoning: stringField
            },
            required: ["templateName", "clipIds", "reasoning"]
        }
    },
    {
        name: "ASSEMBLE_COMPLETE",
        description: "Return this only after assembly has completed or no more steps are needed.",
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {
                summary: stringField,
                sequenceName: stringField
            },
            required: ["summary"]
        }
    }
];


/***/ },

/***/ 8156
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3012), exports);
__exportStar(__webpack_require__(2822), exports);
__exportStar(__webpack_require__(4534), exports);
__exportStar(__webpack_require__(6141), exports);
__exportStar(__webpack_require__(6490), exports);


/***/ },

/***/ 6141
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cameraClipsSchema = exports.cameraClipSchema = exports.emotionClipsSchema = exports.emotionClipSchema = exports.faceClustersSchema = exports.faceClusterSchema = exports.weddingSegmentsSchema = exports.weddingSegmentSchema = void 0;
const generative_ai_1 = __webpack_require__(6445);
exports.weddingSegmentSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        id: { type: generative_ai_1.SchemaType.STRING },
        label: { type: generative_ai_1.SchemaType.STRING },
        confidence: { type: generative_ai_1.SchemaType.NUMBER },
        start: { type: generative_ai_1.SchemaType.NUMBER },
        end: { type: generative_ai_1.SchemaType.NUMBER },
        source: { type: generative_ai_1.SchemaType.STRING }
    },
    required: ["id", "label", "confidence", "start", "end", "source"]
};
exports.weddingSegmentsSchema = {
    type: generative_ai_1.SchemaType.ARRAY,
    items: exports.weddingSegmentSchema
};
exports.faceClusterSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        id: { type: generative_ai_1.SchemaType.STRING },
        label: { type: generative_ai_1.SchemaType.STRING },
        role: { type: generative_ai_1.SchemaType.STRING, format: "enum", enum: ["bride", "groom", "family", "guest", "unknown"] },
        confidence: { type: generative_ai_1.SchemaType.NUMBER },
        clipIds: { type: generative_ai_1.SchemaType.ARRAY, items: { type: generative_ai_1.SchemaType.STRING } },
        emotionTags: { type: generative_ai_1.SchemaType.ARRAY, items: { type: generative_ai_1.SchemaType.STRING } },
        source: { type: generative_ai_1.SchemaType.STRING }
    },
    required: ["id", "label", "role", "confidence", "clipIds", "emotionTags", "source"]
};
exports.faceClustersSchema = {
    type: generative_ai_1.SchemaType.ARRAY,
    items: exports.faceClusterSchema
};
exports.emotionClipSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        clipId: { type: generative_ai_1.SchemaType.STRING },
        clipName: { type: generative_ai_1.SchemaType.STRING },
        emotions: { type: generative_ai_1.SchemaType.ARRAY, items: { type: generative_ai_1.SchemaType.STRING } },
        confidence: { type: generative_ai_1.SchemaType.NUMBER },
        source: { type: generative_ai_1.SchemaType.STRING }
    },
    required: ["clipId", "clipName", "emotions", "confidence", "source"]
};
exports.emotionClipsSchema = {
    type: generative_ai_1.SchemaType.ARRAY,
    items: exports.emotionClipSchema
};
exports.cameraClipSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        clipId: { type: generative_ai_1.SchemaType.STRING },
        clipName: { type: generative_ai_1.SchemaType.STRING },
        shotType: { type: generative_ai_1.SchemaType.STRING },
        movement: { type: generative_ai_1.SchemaType.STRING },
        confidence: { type: generative_ai_1.SchemaType.NUMBER },
        source: { type: generative_ai_1.SchemaType.STRING }
    },
    required: ["clipId", "clipName", "shotType", "movement", "confidence", "source"]
};
exports.cameraClipsSchema = {
    type: generative_ai_1.SchemaType.ARRAY,
    items: exports.cameraClipSchema
};


/***/ },

/***/ 6490
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reelPlanSchema = void 0;
const generative_ai_1 = __webpack_require__(6445);
const clipPlanSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        clipId: { type: generative_ai_1.SchemaType.STRING },
        durationSeconds: { type: generative_ai_1.SchemaType.NUMBER },
        reason: { type: generative_ai_1.SchemaType.STRING },
        emotionWeight: { type: generative_ai_1.SchemaType.NUMBER },
        musicEnergyWeight: { type: generative_ai_1.SchemaType.NUMBER },
        shotWeight: { type: generative_ai_1.SchemaType.NUMBER }
    },
    required: [
        "clipId",
        "durationSeconds",
        "reason",
        "emotionWeight",
        "musicEnergyWeight",
        "shotWeight"
    ]
};
exports.reelPlanSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        title: { type: generative_ai_1.SchemaType.STRING },
        templateName: { type: generative_ai_1.SchemaType.STRING },
        intentSummary: { type: generative_ai_1.SchemaType.STRING },
        targetDurationSeconds: { type: generative_ai_1.SchemaType.NUMBER },
        clips: {
            type: generative_ai_1.SchemaType.ARRAY,
            items: clipPlanSchema
        },
        notes: {
            type: generative_ai_1.SchemaType.ARRAY,
            items: { type: generative_ai_1.SchemaType.STRING }
        }
    },
    required: [
        "title",
        "templateName",
        "intentSummary",
        "targetDurationSeconds",
        "clips",
        "notes"
    ]
};


/***/ },

/***/ 3012
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toFunctionDeclaration = toFunctionDeclaration;
exports.validateSchemaValue = validateSchemaValue;
const generative_ai_1 = __webpack_require__(6445);
function toFunctionDeclaration(schema) {
    return {
        name: schema.name,
        description: schema.description,
        parameters: schema.parameters
    };
}
function validateSchemaValue(value, schema) {
    if (!matchesSchema(value, schema)) {
        throw new Error("Gemini structured response did not match the expected schema.");
    }
    return value;
}
function matchesSchema(value, schema) {
    switch (schema.type) {
        case generative_ai_1.SchemaType.STRING:
            return typeof value === "string" || (schema.nullable === true && value === null);
        case generative_ai_1.SchemaType.NUMBER:
            return typeof value === "number" || (schema.nullable === true && value === null);
        case generative_ai_1.SchemaType.INTEGER:
            return Number.isInteger(value) || (schema.nullable === true && value === null);
        case generative_ai_1.SchemaType.BOOLEAN:
            return typeof value === "boolean" || (schema.nullable === true && value === null);
        case generative_ai_1.SchemaType.ARRAY:
            return (Array.isArray(value) &&
                value.every((entry) => matchesSchema(entry, schema.items))) || (schema.nullable === true && value === null);
        case generative_ai_1.SchemaType.OBJECT:
            if ((schema.nullable === true && value === null)) {
                return true;
            }
            if (typeof value !== "object" || value === null || Array.isArray(value)) {
                return false;
            }
            for (const key of schema.required ?? []) {
                if (!(key in value)) {
                    return false;
                }
            }
            return Object.entries(schema.properties).every(([key, propertySchema]) => {
                if (!(key in value)) {
                    return !(schema.required ?? []).includes(key);
                }
                return matchesSchema(value[key], propertySchema);
            });
        default:
            return false;
    }
}


/***/ },

/***/ 5407
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AIChatService = void 0;
const AIRouter_1 = __webpack_require__(8026);
const AICopilot_1 = __webpack_require__(318);
const CommandParsingService_1 = __webpack_require__(4434);
const CommandValidator_1 = __webpack_require__(4610);
const CommandExecutor_1 = __webpack_require__(1779);
class AIChatService {
    router = new AIRouter_1.AIRouter();
    commandParser = new CommandParsingService_1.CommandParsingService();
    commandValidator = new CommandValidator_1.CommandValidator();
    commandExecutor = new CommandExecutor_1.CommandExecutor();
    copilot = new AICopilot_1.AICopilot();
    async ask(prompt) {
        const resolved = await this.copilot.resolve({
            intent: "assistant:chat",
            context: prompt,
            localResolver: async (snapshot, value) => {
                const parsedLocalCommand = this.commandParser.parseLocal(String(value), snapshot);
                if (!parsedLocalCommand) {
                    return null;
                }
                const validationResult = this.commandValidator.validate(parsedLocalCommand);
                if (!validationResult.valid) {
                    return `[local] Command validation failed: ${validationResult.errors.join(", ")}`;
                }
                const executionResult = await this.commandExecutor.execute(parsedLocalCommand);
                return executionResult.success
                    ? `[local] Command executed successfully: ${executionResult.message}`
                    : `[local] Command failed: ${executionResult.error}`;
            },
            geminiResolver: async (snapshot, value) => {
                const promptText = String(value);
                const parsedGeminiCommand = await this.commandParser.parseWithGemini(promptText);
                if (parsedGeminiCommand) {
                    const validationResult = this.commandValidator.validate(parsedGeminiCommand);
                    if (validationResult.valid) {
                        const executionResult = await this.commandExecutor.execute(parsedGeminiCommand);
                        return executionResult.success
                            ? `[gemini] Command executed successfully: ${executionResult.message}`
                            : `[gemini] Command failed: ${executionResult.error}`;
                    }
                }
                const request = {
                    prompt: [
                        "Premiere context snapshot JSON:",
                        JSON.stringify(snapshot),
                        "",
                        `User request: ${promptText}`
                    ].join("\n")
                };
                const response = await this.router.chat(request);
                return `[gemini] ${response.text}`;
            }
        });
        return resolved.value;
    }
}
exports.AIChatService = AIChatService;


/***/ },

/***/ 4434
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.CommandParsingService = void 0;
const GeminiService_1 = __webpack_require__(5449);
const schemas_1 = __webpack_require__(8156);
class CommandParsingService {
    parseLocal(commandText, snapshot) {
        const normalized = commandText.trim().toLowerCase();
        const durationMatch = normalized.match(/(\d+)\s*(?:second|seconds|sec|s)\b/);
        const duration = durationMatch ? Number(durationMatch[1]) : null;
        if (normalized.includes("selection") || normalized.includes("selected") || normalized.includes("select clips")) {
            return buildCommand("READ_SELECTED_CLIPS", {});
        }
        if (normalized.includes("timeline")) {
            return buildCommand("READ_TIMELINE", {});
        }
        if (normalized.includes("playhead")) {
            return buildCommand("GET_PLAYHEAD", {});
        }
        if (normalized.includes("trim")) {
            return buildCommand("AUTO_TRIM", {});
        }
        if ((normalized.includes("beat") && normalized.includes("cut")) || normalized === "cut") {
            return buildCommand("BEAT_CUT", {});
        }
        if (normalized.includes("reel") || normalized.includes("highlight") || normalized.includes("short")) {
            return buildCommand("CREATE_REEL", {
                duration: duration ?? inferDurationFromSnapshot(snapshot)
            });
        }
        return null;
    }
    async parseWithGemini(commandText) {
        try {
            const toolCall = await (0, GeminiService_1.runGeminiTool)([
                "Translate the user's editing request into exactly one structured Premiere command tool call.",
                "Prefer the most direct available action.",
                "User request:",
                commandText
            ].join("\n"), schemas_1.commandToolSchemas);
            return {
                id: `cmd_${Date.now()}`,
                action: toolCall.name,
                payload: toolCall.args,
                timestamp: Date.now()
            };
        }
        catch (error) {
            console.error('Error parsing command with Gemini:', error);
            return null;
        }
    }
}
exports.CommandParsingService = CommandParsingService;
function buildCommand(action, payload) {
    return {
        id: `cmd_${Date.now()}`,
        action,
        payload,
        timestamp: Date.now()
    };
}
function inferDurationFromSnapshot(snapshot) {
    const candidate = Math.round(Math.max(15, snapshot.outPoint - snapshot.inPoint));
    return candidate > 0 ? candidate : 45;
}


/***/ },

/***/ 3054
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AIController = void 0;
const AIChatService_1 = __webpack_require__(5407);
const AIState_1 = __webpack_require__(9661);
class AIController {
    chatService = new AIChatService_1.AIChatService();
    async ask(prompt) {
        return this.chatService.ask(prompt);
    }
    getProvider() {
        return AIState_1.AIState.provider();
    }
    getModel() {
        return AIState_1.AIState.model();
    }
    getApiKey() {
        return AIState_1.AIState.apiKey();
    }
    setApiKey(key) {
        AIState_1.AIState.setApiKey(key);
    }
}
exports.AIController = AIController;


/***/ },

/***/ 9661
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AIState = void 0;
const GeminiService_1 = __webpack_require__(5449);
const config_1 = __webpack_require__(7028);
// NOTE: This is a simplified state manager for the UI.
// The provider is hardcoded to Gemini as it's the only one implemented.
// The model is also fixed for now.
// The main purpose is to abstract the API key storage.
class AIState {
    static provider() {
        return 'gemini';
    }
    static model() {
        return GeminiService_1.GEMINI_MODEL;
    }
    static apiKey() {
        return (0, config_1.resolveGeminiConfig)().apiKey;
    }
    static setApiKey(key) {
        (0, config_1.saveGeminiConfig)({ apiKey: key });
    }
}
exports.AIState = AIState;


/***/ },

/***/ 5710
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3054), exports);
__exportStar(__webpack_require__(9661), exports);


/***/ },

/***/ 1779
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.CommandExecutor = void 0;
const ClipController_1 = __webpack_require__(7878);
const ExportController_1 = __webpack_require__(2622);
const MarkerController_1 = __webpack_require__(4778);
const EffectsController_1 = __webpack_require__(9585);
const PremiereBridge_1 = __webpack_require__(1862);
const SequenceController_1 = __webpack_require__(4857);
const TimelineReader_1 = __webpack_require__(824);
const CommandValidator_1 = __webpack_require__(4610);
class CommandExecutor {
    bridge;
    validator;
    timelineReader;
    clips;
    markers;
    sequences;
    exporter;
    effects;
    constructor(dependencies = {}) {
        this.bridge = dependencies.bridge ?? new PremiereBridge_1.PremiereBridge();
        this.validator = dependencies.validator ?? new CommandValidator_1.CommandValidator();
        this.timelineReader = new TimelineReader_1.TimelineReader(this.bridge);
        this.clips = new ClipController_1.ClipController(this.bridge);
        this.markers = new MarkerController_1.MarkerController(this.bridge);
        this.sequences = new SequenceController_1.SequenceController(this.bridge);
        this.exporter = new ExportController_1.ExportController(this.bridge);
        this.effects = new EffectsController_1.EffectsController(this.bridge);
    }
    async execute(command) {
        const validation = this.validator.validate(command);
        if (!validation.valid) {
            return {
                success: false,
                message: "Command rejected by validation.",
                error: validation.errors.join(" ")
            };
        }
        switch (command.action) {
            case "READ_TIMELINE":
                return this.readTimeline();
            case "READ_SELECTED_CLIPS":
                return {
                    success: true,
                    message: "Selected clips read.",
                    data: await this.timelineReader.getSelectedClips()
                };
            case "GET_IN_OUT":
                return {
                    success: true,
                    message: "In and out points read.",
                    data: await this.timelineReader.getInOut()
                };
            case "GET_PLAYHEAD":
                return {
                    success: true,
                    message: "Playhead read.",
                    data: await this.timelineReader.getPlayhead()
                };
            case "MOVE_PLAYHEAD":
                return this.bridge.execute(command.action, command.payload);
            case "CREATE_MARKER":
                return this.markers.create(command.payload.name, command.payload.time, command.payload.color);
            case "DELETE_MARKER":
                return this.markers.delete(command.payload.markerId);
            case "CUT_CLIP":
                return this.clips.cut(command.payload.clipId, command.payload.time);
            case "TRIM_CLIP":
                return this.clips.trim(command.payload.clipId, command.payload.start, command.payload.end);
            case "MOVE_CLIP":
                return this.clips.move(command.payload.clipId, command.payload.targetTrackIndex, command.payload.start);
            case "CREATE_SEQUENCE":
                return this.sequences.create(command.payload.name, command.payload.fps);
            case "IMPORT_MEDIA":
                return this.sequences.importMedia(command.payload.mediaPath, command.payload.binPath);
            case "EXPORT_SEQUENCE":
                return this.exporter.exportSequence(command.payload.destinationPath, command.payload.sequenceId, command.payload.preset);
            case "CREATE_REEL":
                return this.bridge.execute(command.action, command.payload);
            case "RIPPLE_DELETE":
                return this.sequences.rippleDelete(command.payload.start, command.payload.end);
            case "AUTO_TRIM":
                return this.effects.autoTrim();
            case "BEAT_CUT":
                return this.effects.beatCut();
            case "SILENCE_REMOVE":
                return this.effects.silenceRemove();
            case "SPEED_RAMP":
                return this.effects.speedRamp(command.payload.clipId, command.payload.from, command.payload.to);
            case "AUTO_ZOOM":
                return this.effects.autoZoom(command.payload.clipId, command.payload.start, command.payload.end);
            case "REFRAME":
                return this.effects.reframe(command.payload.clipId);
            case "ADD_CLIP_TO_SEQUENCE":
            case "ADD_AUDIO_TO_SEQUENCE":
            case "ADD_TRANSITION":
            case "APPLY_COLOR_MATCH":
            case "APPLY_SKIN_TONE_PROTECTION":
            case "APPLY_FILM_LUT":
            case "AUTO_GRADE":
            case "APPLY_PAN_AND_ZOOM":
            case "APPLY_PARALLAX":
            case "APPLY_MOTION_BLUR":
            case "REMOVE_NOISE":
            case "ENHANCE_VOICE":
            case "AUTO_DUCK":
            case "CLEANUP_SPEECH":
            case "INSERT_CAPTIONS":
                return this.bridge.execute(command.action, command.payload);
        }
    }
    async readTimeline() {
        const timeline = await this.timelineReader.read();
        if (timeline === null) {
            return {
                success: false,
                message: "No active Premiere timeline is available.",
                error: "TIMELINE_NOT_AVAILABLE"
            };
        }
        return {
            success: true,
            message: "Timeline read.",
            data: timeline
        };
    }
}
exports.CommandExecutor = CommandExecutor;


/***/ },

/***/ 4737
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.CommandRegistry = void 0;
const Command_1 = __webpack_require__(111);
class CommandRegistry {
    actions = new Set(Command_1.COMMAND_ACTIONS);
    has(action) {
        return this.actions.has(action);
    }
    list() {
        return [...this.actions];
    }
}
exports.CommandRegistry = CommandRegistry;


/***/ },

/***/ 4610
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.CommandValidator = void 0;
const CommandRegistry_1 = __webpack_require__(4737);
class CommandValidator {
    registry;
    constructor(registry = new CommandRegistry_1.CommandRegistry()) {
        this.registry = registry;
    }
    validate(command) {
        const errors = [];
        if (!isRecord(command)) {
            return { valid: false, errors: ["Command must be an object."] };
        }
        if (typeof command.id !== "string" || command.id.length === 0) {
            errors.push("Command id is required.");
        }
        if (typeof command.action !== "string" || !this.registry.has(command.action)) {
            errors.push("Command action is not supported.");
        }
        if (!isRecord(command.payload)) {
            errors.push("Command payload must be an object.");
        }
        if (!isFiniteNumber(command.timestamp)) {
            errors.push("Command timestamp must be a finite number.");
        }
        if (errors.length > 0) {
            return { valid: false, errors };
        }
        const typedCommand = command;
        this.validatePayload(typedCommand.action, typedCommand.payload, errors);
        return { valid: errors.length === 0, errors };
    }
    validatePayload(action, payload, errors) {
        switch (action) {
            case "MOVE_PLAYHEAD":
                requireFiniteNumber(payload, "time", errors);
                break;
            case "CREATE_MARKER":
                requireNonEmptyString(payload, "name", errors);
                requireFiniteNumber(payload, "time", errors);
                break;
            case "DELETE_MARKER":
                requireNonEmptyString(payload, "markerId", errors);
                break;
            case "CUT_CLIP":
                requireNonEmptyString(payload, "clipId", errors);
                requireFiniteNumber(payload, "time", errors);
                break;
            case "TRIM_CLIP":
                requireNonEmptyString(payload, "clipId", errors);
                requireFiniteNumber(payload, "start", errors);
                requireFiniteNumber(payload, "end", errors);
                break;
            case "MOVE_CLIP":
                requireNonEmptyString(payload, "clipId", errors);
                requireFiniteNumber(payload, "targetTrackIndex", errors);
                requireFiniteNumber(payload, "start", errors);
                break;
            case "CREATE_SEQUENCE":
                requireNonEmptyString(payload, "name", errors);
                break;
            case "IMPORT_MEDIA":
                requireNonEmptyString(payload, "mediaPath", errors);
                break;
            case "EXPORT_SEQUENCE":
                requireNonEmptyString(payload, "destinationPath", errors);
                break;
            case "CREATE_REEL":
                requireFiniteNumber(payload, "duration", errors);
                break;
            case "RIPPLE_DELETE":
                requireFiniteNumber(payload, "start", errors);
                requireFiniteNumber(payload, "end", errors);
                break;
            case "ADD_CLIP_TO_SEQUENCE":
                if (typeof payload.clipId !== "string" &&
                    typeof payload.mediaPath !== "string") {
                    errors.push("clipId or mediaPath must be provided.");
                }
                requireFiniteNumber(payload, "start", errors);
                break;
            case "ADD_AUDIO_TO_SEQUENCE":
                if (typeof payload.clipId !== "string" &&
                    typeof payload.mediaPath !== "string" &&
                    typeof payload.assetId !== "string") {
                    errors.push("clipId, mediaPath, or assetId must be provided.");
                }
                requireFiniteNumber(payload, "start", errors);
                break;
            case "ADD_TRANSITION":
                requireNonEmptyString(payload, "type", errors);
                requireFiniteNumber(payload, "start", errors);
                requireFiniteNumber(payload, "duration", errors);
                break;
            case "APPLY_COLOR_MATCH":
                requireNonEmptyString(payload, "sourceClipId", errors);
                requireNonEmptyString(payload, "targetClipId", errors);
                break;
            case "APPLY_SKIN_TONE_PROTECTION":
            case "APPLY_FILM_LUT":
            case "AUTO_GRADE":
            case "APPLY_PAN_AND_ZOOM":
            case "APPLY_PARALLAX":
            case "APPLY_MOTION_BLUR":
            case "REMOVE_NOISE":
            case "ENHANCE_VOICE":
            case "CLEANUP_SPEECH":
                requireNonEmptyString(payload, "clipId", errors);
                break;
            case "AUTO_DUCK":
                requireNonEmptyString(payload, "mainClipId", errors);
                requireNonEmptyString(payload, "musicClipId", errors);
                break;
            case "INSERT_CAPTIONS":
                requireNonEmptyString(payload, "captions", errors);
                break;
            case "READ_TIMELINE":
            case "READ_SELECTED_CLIPS":
            case "GET_IN_OUT":
            case "GET_PLAYHEAD":
            case "AUTO_TRIM":
            case "BEAT_CUT":
            case "SILENCE_REMOVE":
            case "SPEED_RAMP":
            case "AUTO_ZOOM":
            case "REFRAME":
                break;
        }
    }
}
exports.CommandValidator = CommandValidator;
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}
function requireFiniteNumber(payload, key, errors) {
    if (!isFiniteNumber(payload[key])) {
        errors.push(`${key} must be a finite number.`);
    }
}
function requireNonEmptyString(payload, key, errors) {
    if (typeof payload[key] !== "string" || payload[key].trim().length === 0) {
        errors.push(`${key} must be a non-empty string.`);
    }
}


/***/ },

/***/ 4198
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const AudioAIEngine_1 = __webpack_require__(2426);
const AudioAIComponent = () => {
    const [result, setResult] = (0, react_1.useState)('');
    const audioAIEngine = new AudioAIEngine_1.AudioAIEngine();
    const handleAction = async (action, ...args) => {
        const res = await action(...args);
        setResult(Array.isArray(res) ? res.join(', ') : res);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #ccc', padding: '10px', margin: '10px' }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Audio AI" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '10px' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(audioAIEngine.removeNoise.bind(audioAIEngine)), children: "Remove Noise" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(audioAIEngine.enhanceVoice.bind(audioAIEngine)), children: "Enhance Voice" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(audioAIEngine.autoDuck.bind(audioAIEngine)), children: "Auto-Duck Music" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(audioAIEngine.cleanupSpeech.bind(audioAIEngine)), children: "Cleanup Speech" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginBottom: '10px' }, children: (0, jsx_runtime_1.jsx)("button", { onClick: () => setResult(audioAIEngine.suggestSFX('video_clip_with_motion').join(', ')), children: "Suggest SFX" }) }), result && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }, children: ["Result: ", result] }), (0, jsx_runtime_1.jsx)("button", { style: { marginTop: '5px' }, children: "Preview (placeholder)" }), (0, jsx_runtime_1.jsx)("button", { style: { marginTop: '5px', marginLeft: '5px' }, children: "Commit" })] }))] }));
};
exports["default"] = AudioAIComponent;


/***/ },

/***/ 1161
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const LearnStyleEngine_1 = __webpack_require__(3426);
const AutoEditAssembler_1 = __webpack_require__(5336);
const templates_1 = __webpack_require__(6552);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const AutoEditComponent = () => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [styleProfiles, setStyleProfiles] = (0, react_1.useState)({});
    const [selectedStyle, setSelectedStyle] = (0, react_1.useState)('');
    const [selectedTemplate, setSelectedTemplate] = (0, react_1.useState)(templates_1.AUTO_EDIT_TEMPLATES[0].name);
    const [progressLabel, setProgressLabel] = (0, react_1.useState)('Ready to assemble a cut.');
    const [progressPercent, setProgressPercent] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const learnStyleEngine = new LearnStyleEngine_1.LearnStyleEngine();
        setStyleProfiles(learnStyleEngine.getStyleProfiles());
    }, []);
    const handleAutoEdit = async () => {
        setIsEditing(true);
        setProgressPercent(0);
        setProgressLabel("Preparing Auto Edit assembly...");
        const assembler = new AutoEditAssembler_1.AutoEditAssembler();
        try {
            const selectedStyleProfile = selectedStyle ? styleProfiles[selectedStyle] : undefined;
            const result = await assembler.assemble(selectedTemplate, [], selectedStyleProfile, (next) => {
                setProgressPercent(next.percent);
                setProgressLabel(`${next.label} (${next.completed}/${next.total})`);
            });
            setProgressPercent(100);
            setProgressLabel("Auto Edit assembly complete.");
            alert(result);
        }
        catch (error) {
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            }
            else {
                alert('An unknown error occurred.');
            }
        }
        setIsEditing(false);
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Auto Edit Engine", subtitle: "Template-driven sequence assembly with live placement progress.", children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: theme_1.spacing.sm, flexWrap: 'wrap', alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: isEditing ? 'Assembling' : 'Ready', tone: isEditing ? 'warning' : 'success' }) }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, marginBottom: theme_1.spacing.md }, children: [(isEditing || progressPercent > 0) && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progressPercent, label: `${progressPercent}%` }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.sm, color: theme_1.colors.inkMuted }, children: progressLabel })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '10px' }, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "template-select-autoedit", style: { marginRight: '10px' }, children: "Select Template:" }), (0, jsx_runtime_1.jsx)("select", { id: "template-select-autoedit", value: selectedTemplate, onChange: (e) => setSelectedTemplate(e.target.value), style: { padding: '5px', marginRight: '20px' }, children: templates_1.AUTO_EDIT_TEMPLATES.map(template => ((0, jsx_runtime_1.jsx)("option", { value: template.name, children: template.name }, template.name))) }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "style-profile-select-autoedit", style: { marginRight: '10px' }, children: "Select Style Profile:" }), (0, jsx_runtime_1.jsxs)("select", { id: "style-profile-select-autoedit", value: selectedStyle, onChange: (e) => setSelectedStyle(e.target.value), style: { padding: '5px' }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Default Style" }), Object.keys(styleProfiles).map(profileName => ((0, jsx_runtime_1.jsx)("option", { value: profileName, children: profileName }, profileName)))] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: handleAutoEdit, disabled: isEditing, children: isEditing ? 'Editing...' : 'Generate Auto Edit' })] }));
};
exports["default"] = AutoEditComponent;


/***/ },

/***/ 4238
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const CaptionAIEngine_1 = __webpack_require__(2218);
const CaptionAIComponent = () => {
    const [textToCaption, setTextToCaption] = (0, react_1.useState)('This is a sample text for captioning.');
    const [language, setLanguage] = (0, react_1.useState)('english');
    const [style, setStyle] = (0, react_1.useState)('standard');
    const [generatedCaptions, setGeneratedCaptions] = (0, react_1.useState)('');
    const [isGenerating, setIsGenerating] = (0, react_1.useState)(false);
    const captionAIEngine = new CaptionAIEngine_1.CaptionAIEngine();
    const handleGenerateCaptions = async () => {
        setIsGenerating(true);
        const result = await captionAIEngine.generateCaptions(textToCaption, language, style);
        setGeneratedCaptions(result);
        setIsGenerating(false);
    };
    const handleInsertCaptions = async () => {
        const result = await captionAIEngine.insertCaptions(generatedCaptions);
        alert(result);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #ccc', padding: '10px', margin: '10px' }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Caption AI" }), (0, jsx_runtime_1.jsx)("textarea", { value: textToCaption, onChange: (e) => setTextToCaption(e.target.value), style: { width: '100%', minHeight: '100px', marginBottom: '10px' } }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Language: " }), (0, jsx_runtime_1.jsxs)("select", { value: language, onChange: (e) => setLanguage(e.target.value), style: { marginRight: '10px' }, children: [(0, jsx_runtime_1.jsx)("option", { value: "english", children: "English" }), (0, jsx_runtime_1.jsx)("option", { value: "hindi", children: "Hindi" }), (0, jsx_runtime_1.jsx)("option", { value: "hinglish", children: "Hinglish" })] }), (0, jsx_runtime_1.jsx)("label", { children: "Style: " }), (0, jsx_runtime_1.jsxs)("select", { value: style, onChange: (e) => setStyle(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "standard", children: "Standard" }), (0, jsx_runtime_1.jsx)("option", { value: "karaoke", children: "Karaoke" })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleGenerateCaptions, disabled: isGenerating, style: { marginTop: '10px' }, children: isGenerating ? 'Generating...' : 'Generate Captions' }), generatedCaptions && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: '10px' }, children: [(0, jsx_runtime_1.jsx)("h4", { children: "Generated Captions" }), (0, jsx_runtime_1.jsx)("pre", { style: { backgroundColor: '#f0f0f0', padding: '10px' }, children: generatedCaptions }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleInsertCaptions(), style: { marginTop: '10px' }, children: "Insert Captions into Timeline" })] }))] }));
};
exports["default"] = CaptionAIComponent;


/***/ },

/***/ 8947
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const ColorAIEngine_1 = __webpack_require__(6528);
const ColorAIComponent = () => {
    const [activeTab, setActiveTab] = (0, react_1.useState)('auto-grade');
    const [result, setResult] = (0, react_1.useState)('');
    const colorAIEngine = new ColorAIEngine_1.ColorAIEngine();
    const handleAction = async (action, ...args) => {
        const res = await action(...args);
        setResult(res);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #ccc', padding: '10px', margin: '10px' }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Color AI" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', marginBottom: '10px' }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('auto-grade'), style: { marginRight: '5px', padding: '8px 12px', border: activeTab === 'auto-grade' ? '2px solid #007bff' : '1px solid #ccc' }, children: "Auto-Grade" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('match'), style: { marginRight: '5px', padding: '8px 12px', border: activeTab === 'match' ? '2px solid #007bff' : '1px solid #ccc' }, children: "Color Match" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('lut'), style: { padding: '8px 12px', border: activeTab === 'lut' ? '2px solid #007bff' : '1px solid #ccc' }, children: "LUT Generator" })] }), activeTab === 'auto-grade' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Auto-Grade" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(colorAIEngine.autoGrade.bind(colorAIEngine)), children: "Apply Auto-Grade" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: '10px', display: 'flex' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '50%', border: '1px solid #ccc', padding: '5px', marginRight: '5px' }, children: "Before (placeholder)" }), (0, jsx_runtime_1.jsx)("div", { style: { width: '50%', border: '1px solid #ccc', padding: '5px' }, children: "After (placeholder)" })] })] })), activeTab === 'match' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Color Match" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(colorAIEngine.applyColorMatch.bind(colorAIEngine)), children: "Apply Color Match" })] })), activeTab === 'lut' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "LUT Generator" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Describe the desired look...", style: { width: '60%', padding: '8px' } }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setResult(JSON.stringify(colorAIEngine.generateLUT('A warm, vintage film look'), null, 2)), children: "Generate LUT" })] })), result && (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }, children: ["Result: ", typeof result === 'object' ? JSON.stringify(result, null, 2) : result] })] }));
};
exports["default"] = ColorAIComponent;


/***/ },

/***/ 7689
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const LearnStyleEngine_1 = __webpack_require__(3426);
const LearnStyleComponent = () => {
    const [sequenceName, setSequenceName] = (0, react_1.useState)('My_Awesome_Sequence');
    const [styleProfileName, setStyleProfileName] = (0, react_1.useState)('Edit Like Rohit');
    const [savedProfiles, setSavedProfiles] = (0, react_1.useState)({});
    const [isLearning, setIsLearning] = (0, react_1.useState)(false);
    const learnStyleEngine = new LearnStyleEngine_1.LearnStyleEngine();
    (0, react_1.useEffect)(() => {
        setSavedProfiles(learnStyleEngine.getStyleProfiles());
    }, []);
    const handleLearnStyle = () => {
        if (!sequenceName || !styleProfileName) {
            alert("Please provide both a sequence name and a style profile name.");
            return;
        }
        setIsLearning(true);
        learnStyleEngine.learn(sequenceName, styleProfileName);
        setSavedProfiles(learnStyleEngine.getStyleProfiles());
        setIsLearning(false);
        alert(`Style profile '${styleProfileName}' has been learned and saved!`);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #ccc', padding: '10px', margin: '10px' }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Learn My Editing Style" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '20px' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: sequenceName, onChange: (e) => setSequenceName(e.target.value), placeholder: "Enter sequence name to analyze", style: { width: '40%', padding: '8px', marginRight: '10px' } }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: styleProfileName, onChange: (e) => setStyleProfileName(e.target.value), placeholder: "Enter name for the style profile", style: { width: '40%', padding: '8px', marginRight: '10px' } }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLearnStyle, disabled: isLearning, style: { padding: '8px 12px' }, children: isLearning ? 'Learning...' : 'Learn Style' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Saved Style Profiles" }), Object.keys(savedProfiles).length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { children: Object.keys(savedProfiles).map(profileName => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("strong", { children: profileName }), (0, jsx_runtime_1.jsx)("pre", { style: { fontSize: '0.8em', backgroundColor: '#f5f5f5', padding: '5px' }, children: JSON.stringify(savedProfiles[profileName], null, 2) })] }, profileName))) })) : ((0, jsx_runtime_1.jsx)("p", { children: "No style profiles learned yet." }))] })] }));
};
exports["default"] = LearnStyleComponent;


/***/ },

/***/ 4038
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const MotionAIEngine_1 = __webpack_require__(1842);
const MotionAIComponent = () => {
    const [result, setResult] = (0, react_1.useState)('');
    const motionAIEngine = new MotionAIEngine_1.MotionAIEngine();
    const handleAction = async (action, ...args) => {
        const res = await action(...args);
        setResult(res);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #ccc', padding: '10px', margin: '10px' }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Motion AI" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '10px' }, children: [(0, jsx_runtime_1.jsx)("h4", { children: "Pan & Zoom" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(motionAIEngine.applyPanAndZoom.bind(motionAIEngine), undefined, 'slow_zoom_in'), children: "Slow Zoom In" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(motionAIEngine.applyPanAndZoom.bind(motionAIEngine), undefined, 'pan_left_to_right'), children: "Pan Left to Right" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '10px' }, children: [(0, jsx_runtime_1.jsx)("h4", { children: "Parallax" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(motionAIEngine.applyParallax.bind(motionAIEngine)), children: "Apply Parallax" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '10px' }, children: [(0, jsx_runtime_1.jsx)("h4", { children: "Motion Blur" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(motionAIEngine.applyMotionBlur.bind(motionAIEngine), undefined, 'light'), children: "Light" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(motionAIEngine.applyMotionBlur.bind(motionAIEngine), undefined, 'medium'), children: "Medium" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => void handleAction(motionAIEngine.applyMotionBlur.bind(motionAIEngine), undefined, 'heavy'), children: "Heavy" })] }), result && (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }, children: ["Result: ", result] })] }));
};
exports["default"] = MotionAIComponent;


/***/ },

/***/ 602
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = AIChatPanel;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const send_mjs_1 = __importDefault(__webpack_require__(8993));
const sparkles_mjs_1 = __importDefault(__webpack_require__(5654));
const ui_1 = __webpack_require__(5710);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const ai = new ui_1.AIController();
function AIChatPanel({ title = "RK Assistant", greeting = "Namaste. I can help plan edits, explain the timeline, and prepare the next action.", suggestedActions = [], onAction }) {
    const [prompt, setPrompt] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [messages, setMessages] = (0, react_1.useState)([
        {
            role: "assistant",
            text: greeting,
            time: timestamp()
        }
    ]);
    const bottomRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);
    async function submit(value = prompt) {
        const text = value.trim();
        if (!text || loading) {
            return;
        }
        setMessages((current) => [
            ...current,
            { role: "user", text, time: timestamp() }
        ]);
        setPrompt("");
        setLoading(true);
        try {
            const reply = await ai.ask(text);
            setMessages((current) => [
                ...current,
                { role: "assistant", text: reply, time: timestamp() }
            ]);
            onAction?.(text);
        }
        catch (error) {
            setMessages((current) => [
                ...current,
                {
                    role: "assistant",
                    text: error instanceof Error ? error.message : String(error),
                    time: timestamp()
                }
            ]);
        }
        finally {
            setLoading(false);
        }
    }
    const onKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void submit();
        }
    };
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { title: title, subtitle: "Persistent AI copilot for your current workspace.", style: { height: "100%" }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md, height: "100%" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: loading ? "Thinking" : "Ready", tone: loading ? "warning" : "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Gemini 3.6 Flash" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.sm, marginBottom: theme_1.spacing.xs }, children: "Suggested Actions" }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap" }, children: suggestedActions.map((action) => ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: "secondary", onClick: () => void submit(action), disabled: loading, style: { display: "inline-flex", alignItems: "center", gap: theme_1.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(sparkles_mjs_1.default, { size: 14 }), action] }, action))) })] }), (0, jsx_runtime_1.jsx)(primitives_1.ScrollArea, { style: {
                        flex: "1 1 auto",
                        maxHeight: "100%",
                        border: `1px solid ${theme_1.colors.border}`,
                        borderRadius: 10,
                        background: theme_1.colors.white,
                        padding: theme_1.spacing.md
                    }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [messages.map((message, index) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                    alignSelf: message.role === "user" ? "flex-end" : "flex-start",
                                    maxWidth: "92%"
                                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                            fontSize: theme_1.typography.sizes.xs,
                                            color: theme_1.colors.inkMuted,
                                            marginBottom: theme_1.spacing.xs
                                        }, children: [message.role === "user" ? "You" : "RK Assistant", " \u2022 ", message.time] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                            background: message.role === "user" ? theme_1.colors.maroon : theme_1.colors.panelMuted,
                                            color: message.role === "user" ? theme_1.colors.white : theme_1.colors.ink,
                                            borderRadius: 10,
                                            padding: theme_1.spacing.sm,
                                            whiteSpace: "pre-wrap",
                                            lineHeight: 1.6
                                        }, children: message.text })] }, `${message.time}-${index}`))), (0, jsx_runtime_1.jsx)("div", { ref: bottomRef })] }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)("textarea", { rows: 4, placeholder: "Bride entry ko slow motion karo, or ask for a dashboard summary...", value: prompt, onChange: (event) => setPrompt(event.target.value), onKeyDown: onKeyDown, style: {
                                width: "100%",
                                boxSizing: "border-box",
                                borderRadius: 10,
                                border: `1px solid ${theme_1.colors.border}`,
                                background: theme_1.colors.white,
                                color: theme_1.colors.ink,
                                padding: `${theme_1.spacing.sm}px ${theme_1.spacing.md}px`,
                                fontSize: theme_1.typography.sizes.sm,
                                resize: "vertical"
                            } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: () => setMessages([{ role: "assistant", text: greeting, time: timestamp() }]), children: "Reset Chat" }), (0, jsx_runtime_1.jsxs)(primitives_1.Button, { onClick: () => void submit(), disabled: loading, style: { display: "inline-flex", alignItems: "center", gap: theme_1.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(send_mjs_1.default, { size: 14 }), loading ? "Sending..." : "Send"] })] })] })] }) }));
}
function timestamp() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


/***/ },

/***/ 7028
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.saveGeminiConfig = exports.resolveGeminiConfig = void 0;
const resolveGeminiConfig = () => {
    const apiKey = typeof window === "undefined"
        ? ""
        : window.__RKFLOW_GEMINI_API_KEY__ || localStorage.getItem("rkflow.gemini.apiKey") || "";
    return {
        apiKey: apiKey.trim(),
    };
};
exports.resolveGeminiConfig = resolveGeminiConfig;
const saveGeminiConfig = (config) => {
    if (typeof window === "undefined") {
        return;
    }
    localStorage.setItem("rkflow.gemini.apiKey", config.apiKey.trim());
    window.__RKFLOW_GEMINI_API_KEY__ = config.apiKey;
};
exports.saveGeminiConfig = saveGeminiConfig;


/***/ },

/***/ 9476
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.APP_VERSION = void 0;
exports.APP_VERSION = "1.0.0";


/***/ },

/***/ 1375
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionManager = void 0;
class TransactionManager {
    PPRO;
    constructor(PPRO) {
        this.PPRO = PPRO;
    }
    async run(callback) {
        const project = await this.PPRO.Project.getActiveProject();
        return await project.lockedAccess(async () => {
            return await callback(project);
        });
    }
    async executeAction(actionBuilder) {
        return await this.run(async (project) => {
            const action = await actionBuilder(project);
            if (!action) {
                throw new Error("TransactionManager: No action returned.");
            }
            return await project.executeTransaction((compoundAction) => {
                compoundAction.addAction(action);
            });
        });
    }
}
exports.TransactionManager = TransactionManager;
exports["default"] = TransactionManager;


/***/ },

/***/ 2148
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContextEngine = void 0;
const PremiereContextProvider_1 = __webpack_require__(9788);
const PremiereContextManager_1 = __webpack_require__(7198);
const premiereService_1 = __webpack_require__(3763);
const ClipManager_1 = __webpack_require__(2276);
class ContextEngine {
    async readSequenceContext() {
        await PremiereContextProvider_1.PremiereContextProvider.refresh();
        const base = PremiereContextManager_1.PremiereContextManager.get();
        const timelineInfo = await premiereService_1.premiereService.getTimelineInfo();
        const selectedClips = await this.readSelectedClips();
        if (!timelineInfo.connected || !base.sequenceName) {
            return null;
        }
        return {
            projectName: base.projectName,
            sequenceName: base.sequenceName,
            sequenceKey: this.getSequenceKey(base.projectName, base.sequenceName),
            fps: base.fps,
            playhead: base.playhead,
            inPoint: base.inPoint,
            outPoint: base.outPoint,
            duration: parseDurationToSeconds(timelineInfo.duration),
            videoTracks: base.videoTracks,
            audioTracks: base.audioTracks,
            selectedClips,
            markers: base.markers
        };
    }
    async readSelectedClips() {
        const clips = await ClipManager_1.clipManager.getSelectedClips();
        return Promise.all(clips.map(async (clip, index) => ({
            id: buildClipId(clip.name, clip.start, clip.track, index),
            name: clip.name,
            start: clip.start,
            end: clip.end,
            duration: clip.duration,
            track: clip.track,
            mediaType: clip.mediaType,
            type: clip.type,
            projectItemId: await getProjectItemId(clip.projectItem)
        })));
    }
    async capture(goal) {
        const context = await this.readSequenceContext();
        const promptLines = [`Goal: ${goal}`];
        if (context) {
            promptLines.push(`Sequence: ${context.sequenceName}`);
            promptLines.push(`Project: ${context.projectName}`);
            promptLines.push(`Selected Clips: ${context.selectedClips.map((clip) => clip.name).join(", ") || "None"}`);
        }
        else {
            promptLines.push("No active sequence");
        }
        return {
            context,
            prompt: promptLines.join("\n")
        };
    }
    getSequenceKey(projectName, sequenceName) {
        return `${projectName}::${sequenceName}`;
    }
}
exports.ContextEngine = ContextEngine;
function buildClipId(name, start, track, index) {
    return `${name}::${track}::${start.toFixed(3)}::${index}`;
}
function parseDurationToSeconds(value) {
    const parts = value.split(":").map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) {
        return 0;
    }
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
}
async function getProjectItemId(projectItem) {
    try {
        const id = await projectItem?.getId?.();
        return typeof id === "string" && id.length > 0 ? id : undefined;
    }
    catch {
        return undefined;
    }
}


/***/ },

/***/ 9573
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DecisionEngine = void 0;
class DecisionEngine {
    choose(options) {
        if (options.length === 0) {
            return null;
        }
        return [...options].sort((left, right) => right.score - left.score)[0];
    }
    summarize(plan) {
        return `${plan.filter((step) => step.status === "ready").length} steps ready, ${plan.filter((step) => step.status === "pending").length} pending confirmation.`;
    }
}
exports.DecisionEngine = DecisionEngine;


/***/ },

/***/ 4647
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KnowledgeEngine = void 0;
const KNOWLEDGE = {
    events: ["Haldi", "Mehndi", "Sangeet", "Baraat", "Pheras", "Vidaai"],
    shotTypes: ["wide", "close", "detail", "drone", "gimbal"],
    pacing: ["slow-open", "emotional-rise", "hero-beat", "celebration-finish"]
};
class KnowledgeEngine {
    trace = [];
    list() {
        this.trace.push({
            service: "KnowledgeEngine",
            timestamp: new Date().toISOString(),
            detail: "Wedding editing knowledge loaded."
        });
        return KNOWLEDGE;
    }
    history() {
        return this.trace;
    }
}
exports.KnowledgeEngine = KnowledgeEngine;


/***/ },

/***/ 1700
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemoryEngine = void 0;
const STORAGE_KEY = "rkflow.brain.memory.v2";
class MemoryEngine {
    load() {
        if (typeof window === "undefined") {
            return this.empty();
        }
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return this.empty();
        }
        try {
            const parsed = JSON.parse(raw);
            return {
                preferences: parsed.preferences ?? {},
                projectFacts: parsed.projectFacts ?? [],
                decisions: parsed.decisions ?? [],
                analysis: parsed.analysis ?? {}
            };
        }
        catch {
            return this.empty();
        }
    }
    save(snapshot) {
        if (typeof window === "undefined") {
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    }
    rememberDecision(decision) {
        const snapshot = this.load();
        snapshot.decisions = [decision, ...snapshot.decisions].slice(0, 20);
        this.save(snapshot);
    }
    getPreference(key) {
        return this.load().preferences[key];
    }
    setPreference(key, value) {
        const snapshot = this.load();
        snapshot.preferences[key] = value;
        this.save(snapshot);
    }
    getAnalysis(scopeKey, cacheKey) {
        const snapshot = this.load();
        const entry = snapshot.analysis[this.composeKey(scopeKey, cacheKey)];
        return entry === undefined ? null : entry;
    }
    setAnalysis(scopeKey, cacheKey, value) {
        const snapshot = this.load();
        snapshot.analysis[this.composeKey(scopeKey, cacheKey)] = value;
        this.save(snapshot);
    }
    clearAnalysis(scopeKey, cacheKey) {
        const snapshot = this.load();
        if (cacheKey) {
            delete snapshot.analysis[this.composeKey(scopeKey, cacheKey)];
        }
        else {
            for (const key of Object.keys(snapshot.analysis)) {
                if (key.startsWith(`${scopeKey}::`)) {
                    delete snapshot.analysis[key];
                }
            }
        }
        this.save(snapshot);
    }
    composeKey(scopeKey, cacheKey) {
        return `${scopeKey}::${cacheKey}`;
    }
    empty() {
        return {
            preferences: {},
            projectFacts: [],
            decisions: [],
            analysis: {}
        };
    }
}
exports.MemoryEngine = MemoryEngine;


/***/ },

/***/ 3206
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlanningEngine = void 0;
class PlanningEngine {
    buildPlan(goal, reasoning) {
        return [
            {
                id: "capture-context",
                title: `Capture context for: ${goal}`,
                status: "ready"
            },
            {
                id: "review-reasoning",
                title: reasoning.slice(0, 120) || "Review Gemini reasoning",
                status: "ready"
            },
            {
                id: "confirm-execution",
                title: "Confirm before any timeline change",
                status: "pending"
            }
        ];
    }
}
exports.PlanningEngine = PlanningEngine;


/***/ },

/***/ 7695
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReasoningEngine = void 0;
const GeminiService_1 = __webpack_require__(5449);
class ReasoningEngine {
    async reason(goal, contextPrompt) {
        return (0, GeminiService_1.runGemini)(`${contextPrompt}\n\nGoal:\n${goal}\n\nReturn a concise reasoning summary and plan outline.`, {
            systemInstruction: "You are RK Brain. Think like a senior Indian wedding film editor."
        });
    }
}
exports.ReasoningEngine = ReasoningEngine;


/***/ },

/***/ 7021
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2148), exports);
__exportStar(__webpack_require__(9573), exports);
__exportStar(__webpack_require__(4647), exports);
__exportStar(__webpack_require__(1700), exports);
__exportStar(__webpack_require__(3206), exports);
__exportStar(__webpack_require__(7695), exports);
__exportStar(__webpack_require__(4488), exports);


/***/ },

/***/ 4488
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 8812
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ActionDispatcher = void 0;
const CommandExecutor_1 = __webpack_require__(1779);
class ActionDispatcher {
    executor;
    constructor(executor = new CommandExecutor_1.CommandExecutor()) {
        this.executor = executor;
    }
    async dispatch(command) {
        return this.executor.execute(command);
    }
    async dispatchBatch(commands) {
        const results = [];
        for (const command of commands) {
            results.push(await this.dispatch(command));
        }
        return results;
    }
}
exports.ActionDispatcher = ActionDispatcher;


/***/ },

/***/ 9286
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ExecutionQueue = void 0;
const ActionDispatcher_1 = __webpack_require__(8812);
class ExecutionQueue {
    dispatcher;
    chain = Promise.resolve();
    constructor(dispatcher = new ActionDispatcher_1.ActionDispatcher()) {
        this.dispatcher = dispatcher;
    }
    enqueue(command) {
        const result = this.chain.then(async () => {
            try {
                const outcome = await this.dispatcher.dispatch(command);
                if (outcome.success) {
                    console.log(`[RK Flow][ExecutionQueue] ${command.action} succeeded.`, { command, outcome });
                }
                else {
                    console.error(`[RK Flow][ExecutionQueue] ${command.action} failed.`, { command, outcome });
                }
                return outcome;
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                console.error(`[RK Flow][ExecutionQueue] ${command.action} threw.`, { command, error });
                return {
                    success: false,
                    message: `${command.action} threw during execution.`,
                    error: message
                };
            }
        });
        this.chain = result.then(() => undefined, () => undefined);
        return result;
    }
    async enqueueBatch(commands) {
        const results = [];
        for (const command of commands) {
            results.push(await this.enqueue(command));
        }
        return results;
    }
}
exports.ExecutionQueue = ExecutionQueue;


/***/ },

/***/ 7365
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.PremiereExecutor = void 0;
const Command_1 = __webpack_require__(111);
const ExecutionQueue_1 = __webpack_require__(9286);
const PreviewGate_1 = __webpack_require__(1016);
const NON_DESTRUCTIVE_ACTIONS = new Set([
    "READ_TIMELINE",
    "READ_SELECTED_CLIPS",
    "GET_IN_OUT",
    "GET_PLAYHEAD"
]);
// These actions are only used by AutoEditAssembler after it creates and activates a new sequence.
const NEW_SEQUENCE_ASSEMBLY_ACTIONS = new Set([
    "CREATE_SEQUENCE",
    "IMPORT_MEDIA",
    "ADD_CLIP_TO_SEQUENCE",
    "ADD_AUDIO_TO_SEQUENCE",
    "ADD_TRANSITION"
]);
class PremiereExecutor {
    queue;
    constructor(queue = new ExecutionQueue_1.ExecutionQueue()) {
        this.queue = queue;
    }
    async run(command) {
        if (!(await this.ensurePreview([command]))) {
            return {
                success: false,
                message: `${command.action} was cancelled before execution.`,
                error: "PREVIEW_CANCELLED"
            };
        }
        return this.queue.enqueue(command);
    }
    runAction(action, payload = {}) {
        return this.run((0, Command_1.createCommand)(action, payload));
    }
    runNewSequenceAssembly(command) {
        if (!NEW_SEQUENCE_ASSEMBLY_ACTIONS.has(command.action)) {
            return Promise.resolve({
                success: false,
                message: `${command.action} is not allowed in the no-confirm new-sequence assembly path.`,
                error: "UNSAFE_NEW_SEQUENCE_ACTION"
            });
        }
        console.log(`[RK Flow][PremiereExecutor] Running ${command.action} in the new-sequence assembly path without PreviewGate.`);
        return this.queue.enqueue(command);
    }
    async runBatch(commands) {
        if (!(await this.ensurePreview(commands))) {
            return commands.map((command) => ({
                success: false,
                message: `${command.action} was cancelled before execution.`,
                error: "PREVIEW_CANCELLED"
            }));
        }
        return this.queue.enqueueBatch(commands);
    }
    async ensurePreview(commands) {
        const destructiveCommands = commands.filter((command) => !NON_DESTRUCTIVE_ACTIONS.has(command.action));
        if (destructiveCommands.length === 0) {
            return true;
        }
        return (0, PreviewGate_1.requestExecutionPreview)(destructiveCommands);
    }
}
exports.PremiereExecutor = PremiereExecutor;


/***/ },

/***/ 1016
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.requestExecutionPreview = requestExecutionPreview;
__webpack_unused_export__ = getActivePreview;
exports.subscribeExecutionPreview = subscribeExecutionPreview;
exports.approveExecutionPreview = approveExecutionPreview;
exports.rejectExecutionPreview = rejectExecutionPreview;
const listeners = new Set();
let activePreview = null;
async function requestExecutionPreview(commands) {
    if (commands.length === 0) {
        return true;
    }
    if (activePreview !== null) {
        throw new Error("Another Premiere preview confirmation is already pending.");
    }
    return new Promise((resolve) => {
        activePreview = {
            id: `preview-${Date.now()}`,
            commands,
            summary: summarizeCommands(commands),
            resolve
        };
        emit();
    });
}
function getActivePreview() {
    if (activePreview === null) {
        return null;
    }
    const { id, commands, summary } = activePreview;
    return { id, commands, summary };
}
function subscribeExecutionPreview(listener) {
    listeners.add(listener);
    listener(getActivePreview());
    return () => {
        listeners.delete(listener);
    };
}
function approveExecutionPreview() {
    settle(true);
}
function rejectExecutionPreview() {
    settle(false);
}
function settle(approved) {
    if (activePreview === null) {
        return;
    }
    const request = activePreview;
    activePreview = null;
    request.resolve(approved);
    emit();
}
function emit() {
    const snapshot = getActivePreview();
    listeners.forEach((listener) => listener(snapshot));
}
function summarizeCommands(commands) {
    if (commands.length === 1) {
        return commands[0].action;
    }
    return `${commands.length} Premiere actions`;
}


/***/ },

/***/ 2318
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const TransactionManager_1 = __importDefault(__webpack_require__(1375));
class MotionEngine {
    PPRO;
    transaction;
    constructor(PPRO) {
        this.PPRO = PPRO;
        this.transaction = new TransactionManager_1.default(PPRO);
    }
    async setPosition(x, y, trackIndex = 0, clipIndex = 0) {
        return await this.transaction.executeAction(async (project) => {
            const sequence = await project.getActiveSequence();
            const track = await sequence.getVideoTrack(trackIndex);
            const clips = await track.getTrackItems(this.PPRO.Constants.TrackItemType.CLIP, false);
            if (!clips.length) {
                throw new Error("No clips found.");
            }
            const clip = clips[clipIndex];
            if (!clip) {
                throw new Error("Invalid clip index.");
            }
            const chain = await clip.getComponentChain();
            const motion = await chain.getComponentAtIndex(1);
            const position = await motion.getParam(0);
            const point = new this.PPRO.PointF();
            point.x = x;
            point.y = y;
            const keyframe = position.createKeyframe(point);
            keyframe.value.value = [x, y];
            return position.createSetValueAction(keyframe, true);
        });
    }
    async center() {
        return await this.setPosition(0.5, 0.5);
    }
    async left() {
        return await this.setPosition(0.25, 0.5);
    }
    async right() {
        return await this.setPosition(0.75, 0.5);
    }
    async top() {
        return await this.setPosition(0.5, 0.25);
    }
    async bottom() {
        return await this.setPosition(0.5, 0.75);
    }
}
exports["default"] = MotionEngine;


/***/ },

/***/ 1742
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = SettingsPage;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const GeminiService_1 = __webpack_require__(5449);
const AIRouter_1 = __webpack_require__(8026);
const AIRegistry_1 = __webpack_require__(5989);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const config_1 = __webpack_require__(7028);
const router = new AIRouter_1.AIRouter();
function SettingsPage() {
    const [apiKey, setApiKey] = (0, react_1.useState)((0, config_1.resolveGeminiConfig)().apiKey);
    const [status, setStatus] = (0, react_1.useState)("Add your Gemini API key in Settings.");
    const runtimeStatus = (0, GeminiService_1.getGeminiRuntimeStatus)();
    const usageStats = (0, GeminiService_1.getGeminiUsageStats)();
    function save() {
        (0, config_1.saveGeminiConfig)({ apiKey });
        setStatus(apiKey.trim() ? "Gemini API key saved locally." : "Gemini API key cleared.");
    }
    async function test() {
        try {
            setStatus("Testing Gemini connection...");
            const result = await router.chat({
                prompt: "Reply with exactly: RK Flow AI Connected"
            });
            setStatus(result.text);
        }
        catch (error) {
            setStatus(error instanceof Error ? error.message : "Connection failed.");
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Gemini Settings", subtitle: "Single active provider for RK Flow on Monday, August 3, 2026.", children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Active Provider: Gemini", tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Model: ${GeminiService_1.GEMINI_MODEL}` })] }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { type: "password", placeholder: "Paste Gemini API key", value: apiKey, onChange: (event) => setApiKey(event.target.value) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: save, children: "Save API Key" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void test(), children: "Test Connection" })] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.sm }, children: status })] }) }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Appearance", subtitle: "Theme foundation for the Indian wedding workspace.", children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Ivory base" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Maroon accent" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Muted gold accent" })] }) }), (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Quota / Cache", subtitle: "Session-level Gemini behavior and rate-limit visibility.", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${usageStats.totalCalls} session calls` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${usageStats.cacheHits} cache hits`, tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: runtimeStatus.lastQuotaMessage || "No active quota warning", tone: runtimeStatus.lastQuotaMessage ? "warning" : "neutral" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.sm }, children: "Gemini free-tier limits are low. RK Flow now tries local command resolution first and only falls back to Gemini when local parsing is not confident." }), runtimeStatus.lastError && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.sm, color: theme_1.colors.warning, fontSize: theme_1.typography.sizes.sm }, children: ["Last Gemini error: ", runtimeStatus.lastError] }))] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Providers", subtitle: "Only Gemini is wired today. The rest are scaffolded but intentionally disabled.", children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: AIRegistry_1.AI_PROVIDERS.map((provider) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                            display: "flex",
                            justifyContent: "space-between",
                            gap: theme_1.spacing.sm,
                            alignItems: "center",
                            padding: theme_1.spacing.sm,
                            border: `1px solid ${theme_1.colors.border}`,
                            borderRadius: 10,
                            background: provider.enabled ? theme_1.colors.panelMuted : theme_1.colors.white
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.ink, fontWeight: 700 }, children: provider.label }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.xs }, children: provider.enabled ? "Configured now" : "Coming soon" })] }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: provider.enabled ? "Active" : "Coming soon", tone: provider.enabled ? "success" : "neutral" })] }, provider.id))) }) })] }));
}


/***/ },

/***/ 833
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ContextEngine = void 0;
class ContextEngine {
    run() {
        console.log("Gathering cinematic wedding film context...");
        // Simulate gathering various pieces of context
        const context = {
            project: {
                name: "Wedding Project Alpha",
                resolution: "1920x1080",
                frameRate: "29.97fps",
            },
            userPreferences: {
                style: "romantic",
                mood: "joyful",
                length: "3-5 minutes",
            },
            availableAssets: [
                { id: "clip_001", type: "video", tags: ["bride", "getting ready", "happy"] },
                { id: "clip_002", type: "video", tags: ["groom", "first look", "emotional"] },
                { id: "audio_001", type: "audio", tags: ["romantic song", "upbeat"] },
            ],
            weddingSpecifics: {
                coupleName: "Rohit & Priyanka",
                date: "2026-08-01",
                events: ["ceremony", "reception", "photoshoot"],
            },
        };
        return context;
    }
}
exports.ContextEngine = ContextEngine;


/***/ },

/***/ 5454
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.DecisionEngine = void 0;
const GeminiService_1 = __webpack_require__(5449);
const schemas_1 = __webpack_require__(8156);
const config_1 = __webpack_require__(7028);
const loggerService_1 = __webpack_require__(2954);
const AutoEditAssembler_1 = __webpack_require__(5336);
const MAX_DECISION_STEPS = 8;
class DecisionEngine {
    assembler = new AutoEditAssembler_1.AutoEditAssembler();
    async run({ context, reasoningResult, planningResult, selectedStyle, onProgress }) {
        const state = {
            selectedSong: reasoningResult.selectedSong ?? planningResult.selectedSong ?? null,
            heroShots: reasoningResult.heroShots ?? [],
            storyStructure: planningResult.storyStructure ?? [],
            assemblyMessage: null,
            sequenceName: "Cinematic Film"
        };
        const toolHistory = [];
        if (!(0, config_1.resolveGeminiConfig)().apiKey) {
            loggerService_1.loggerService.log("AI Director DecisionEngine using local fallback because no Gemini API key is configured.", "warn");
            return this.runLocalLoop(state, context, planningResult, selectedStyle, onProgress, toolHistory);
        }
        let lastResult = null;
        for (let step = 1; step <= MAX_DECISION_STEPS; step += 1) {
            onProgress?.({
                completed: step,
                total: MAX_DECISION_STEPS,
                label: `Decision loop ${step}/${MAX_DECISION_STEPS}`,
                percent: Math.round((step / MAX_DECISION_STEPS) * 100)
            });
            const toolCall = await (0, GeminiService_1.runGeminiTool)(this.buildPrompt(step), schemas_1.aiDirectorToolSchemas, this.buildLoopContext(context, planningResult, state, lastResult, step), {
                systemInstruction: [
                    "You are the AI Director orchestration planner for a Premiere Pro panel.",
                    "Always respond with exactly one function call.",
                    "First choose a song, then hero shots, then a story structure, then assemble.",
                    "Only call ASSEMBLE_COMPLETE after ASSEMBLE_SEQUENCE has already succeeded."
                ].join(" ")
            });
            const typedToolCall = toolCall;
            const executionResult = await this.executeToolCall(typedToolCall, context, state, selectedStyle);
            toolHistory.push({
                name: typedToolCall.name,
                args: typedToolCall.args,
                result: executionResult
            });
            lastResult = executionResult;
            if (typedToolCall.name === "ASSEMBLE_COMPLETE") {
                return this.buildFinalResult(planningResult, state, toolHistory, step, "gemini");
            }
        }
        throw new Error(`AI Director hit the max decision step limit (${MAX_DECISION_STEPS}) before completion.`);
    }
    async runLocalLoop(state, context, planningResult, selectedStyle, onProgress, toolHistory) {
        const localCalls = [
            {
                name: "SELECT_SONG",
                args: {
                    songId: state.selectedSong?.id ??
                        context.availableAssets.find((asset) => asset.type === "audio")?.id ??
                        "",
                    reasoning: "Selected the strongest available soundtrack from local assets."
                }
            },
            {
                name: "SELECT_HERO_SHOTS",
                args: {
                    heroShotIds: state.heroShots.map((shot) => shot.id),
                    reasoning: "Selected the locally-ranked hero shots."
                }
            },
            {
                name: "BUILD_STORY_STRUCTURE",
                args: {
                    segments: state.storyStructure.map((segment) => ({
                        type: segment.type,
                        segment: segment.segment,
                        duration: segment.duration,
                        clipId: this.resolveClipId(segment.clip),
                        content: segment.content
                    })),
                    reasoning: "Reused the deterministic planning output."
                }
            },
            {
                name: "ASSEMBLE_SEQUENCE",
                args: {
                    templateName: "Cinematic Film",
                    clipIds: state.heroShots.map((shot) => shot.id),
                    reasoning: "Assembling the current local plan."
                }
            },
            {
                name: "ASSEMBLE_COMPLETE",
                args: {
                    summary: "Local AI Director fallback completed."
                }
            }
        ];
        for (let index = 0; index < localCalls.length; index += 1) {
            onProgress?.({
                completed: index + 1,
                total: localCalls.length,
                label: `Decision loop ${index + 1}/${localCalls.length}`,
                percent: Math.round(((index + 1) / localCalls.length) * 100)
            });
            const executionResult = await this.executeToolCall(localCalls[index], context, state, selectedStyle);
            toolHistory.push({
                name: localCalls[index].name,
                args: localCalls[index].args,
                result: executionResult
            });
        }
        return this.buildFinalResult(planningResult, state, toolHistory, localCalls.length, "local");
    }
    buildPrompt(step) {
        return [
            `Decision loop step ${step}.`,
            "Choose the next orchestration action for the wedding film.",
            "Prefer the smallest next step that advances toward final sequence assembly."
        ].join(" ");
    }
    buildLoopContext(context, planningResult, state, lastResult, step) {
        return {
            step,
            context,
            planningResult,
            currentState: {
                selectedSongId: state.selectedSong?.id ?? null,
                heroShotIds: state.heroShots.map((shot) => shot.id),
                storyStructure: state.storyStructure.map((segment) => ({
                    type: segment.type,
                    duration: segment.duration,
                    content: segment.content,
                    segment: segment.segment,
                    clipId: this.resolveClipId(segment.clip)
                })),
                assemblyMessage: state.assemblyMessage,
                sequenceName: state.sequenceName
            },
            lastResult
        };
    }
    async executeToolCall(toolCall, context, state, selectedStyle) {
        switch (toolCall.name) {
            case "SELECT_SONG":
                return this.selectSong(toolCall.args, context, state);
            case "SELECT_HERO_SHOTS":
                return this.selectHeroShots(toolCall.args, context, state);
            case "BUILD_STORY_STRUCTURE":
                return this.buildStoryStructure(toolCall.args, context, state);
            case "ASSEMBLE_SEQUENCE":
                return this.assembleSequence(toolCall.args, context, state, selectedStyle);
            case "ASSEMBLE_COMPLETE":
                return toolCall.args;
        }
    }
    selectSong(args, context, state) {
        const song = context.availableAssets.find((asset) => asset.type === "audio" && asset.id === args.songId) ?? null;
        state.selectedSong = song;
        loggerService_1.loggerService.log(`AI Director selected song ${song?.id ?? "none"}.`, "info");
        return {
            selectedSongId: song?.id ?? null,
            reasoning: args.reasoning
        };
    }
    selectHeroShots(args, context, state) {
        const selectedIds = new Set(args.heroShotIds);
        state.heroShots = context.availableAssets.filter((asset) => asset.type === "video" && selectedIds.has(asset.id));
        loggerService_1.loggerService.log(`AI Director selected ${state.heroShots.length} hero shots.`, "info");
        return {
            heroShotIds: state.heroShots.map((shot) => shot.id),
            reasoning: args.reasoning
        };
    }
    buildStoryStructure(args, context, state) {
        const assetsById = new Map(context.availableAssets.map((asset) => [asset.id, asset]));
        state.storyStructure = args.segments.map((segment) => ({
            type: segment.type,
            segment: segment.segment,
            duration: segment.duration,
            content: segment.content,
            clip: segment.clipId ? assetsById.get(segment.clipId) ?? null : undefined
        }));
        loggerService_1.loggerService.log(`AI Director built a ${state.storyStructure.length}-segment story structure.`, "info");
        return {
            segmentCount: state.storyStructure.length,
            reasoning: args.reasoning
        };
    }
    async assembleSequence(args, context, state, selectedStyle) {
        state.sequenceName = args.templateName;
        const assemblyClips = this.buildAssemblyClips(args.clipIds, state.storyStructure, context.availableAssets);
        const message = await this.assembler.assemble(args.templateName, assemblyClips, {
            learnedFrom: selectedStyle || "AI Director"
        });
        state.assemblyMessage = message;
        loggerService_1.loggerService.log(`AI Director assembly submitted for "${args.templateName}".`, "success");
        return {
            message,
            clipCount: assemblyClips.length,
            reasoning: args.reasoning
        };
    }
    buildAssemblyClips(clipIds, storyStructure, availableAssets) {
        const assetsById = new Map(availableAssets.map((asset) => [asset.id, asset]));
        const chosenIds = clipIds.length > 0
            ? clipIds
            : storyStructure
                .map((segment) => this.resolveClipId(segment.clip))
                .filter((clipId) => Boolean(clipId));
        return chosenIds
            .map((clipId) => assetsById.get(clipId))
            .filter((asset) => Boolean(asset))
            .map((asset) => ({
            id: asset.id,
            path: asset.path,
            start: asset.start,
            end: asset.end,
            duration: asset.duration,
            score: asset.score,
            type: asset.type === "audio" ? "audio" : "video"
        }));
    }
    resolveClipId(clip) {
        if (!clip || typeof clip !== "object") {
            return undefined;
        }
        return typeof clip.id === "string"
            ? clip.id
            : undefined;
    }
    buildFinalResult(planningResult, state, toolHistory, iterations, mode) {
        return {
            finalSequence: {
                name: state.sequenceName,
                totalDuration: state.storyStructure.reduce((total, segment) => total + (segment.duration ?? 0), 0),
                selectedSongId: state.selectedSong?.id ?? planningResult.selectedSong?.id ?? null,
                clipCount: state.storyStructure.filter((segment) => segment.clip).length,
                outputResolution: planningResult.projectResolution
            },
            iterations,
            mode,
            toolHistory,
            message: state.assemblyMessage ??
                "AI Director finished without submitting Premiere assembly."
        };
    }
}
exports.DecisionEngine = DecisionEngine;


/***/ },

/***/ 4561
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.PlanningEngine = void 0;
class PlanningEngine {
    run({ context, reasoningResult }) {
        console.log("Planning: Building story structure from Wedding AI segments...");
        const { project, userPreferences } = context;
        const { selectedSong, heroShots } = reasoningResult;
        const storySegments = [];
        // Simple story structure: Intro, Ceremony, Reception, Outro
        storySegments.push({ type: "intro", duration: 10, content: "Opening montage" });
        // Incorporate hero shots into ceremony/reception
        heroShots.forEach((shot, index) => {
            storySegments.push({
                type: "hero_shot",
                segment: index % 2 === 0 ? "ceremony" : "reception",
                clip: shot,
                duration: 5, // Placeholder duration
            });
        });
        storySegments.push({ type: "montage", duration: 30, content: "General wedding moments" });
        storySegments.push({ type: "outro", duration: 15, content: "Closing credits/highlights" });
        const planningResult = {
            overallLength: userPreferences.length, // Desired length from context
            selectedSong: selectedSong,
            storyStructure: storySegments,
            projectResolution: project.resolution,
        };
        return planningResult;
    }
}
exports.PlanningEngine = PlanningEngine;


/***/ },

/***/ 9782
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ReasoningEngine = void 0;
class ReasoningEngine {
    run(context) {
        console.log("Reasoning: Picking a song and selecting hero shots...");
        const { userPreferences, availableAssets } = context;
        // Simulate song selection
        const availableSongs = availableAssets.filter((asset) => asset.type === "audio");
        let selectedSong = null;
        if (availableSongs.length > 0) {
            // Simple logic: pick the first song that matches the mood, or the first available
            selectedSong = availableSongs.find((song) => song.tags?.includes(userPreferences.mood)) || availableSongs[0];
        }
        // Simulate hero shot selection
        const availableVideoClips = availableAssets.filter((asset) => asset.type === "video");
        const heroShots = [];
        if (availableVideoClips.length > 0) {
            // Simple logic: pick clips that match style/mood, or just a few prominent ones
            const relevantTags = [userPreferences.style, userPreferences.mood].filter(Boolean);
            availableVideoClips.forEach((clip) => {
                if (relevantTags.some((tag) => clip.tags?.includes(tag))) {
                    heroShots.push(clip);
                }
            });
            // If no hero shots found with tags, just pick a couple
            if (heroShots.length === 0 && availableVideoClips.length > 0) {
                heroShots.push(availableVideoClips[0]);
                if (availableVideoClips.length > 1) {
                    heroShots.push(availableVideoClips[1]);
                }
            }
        }
        const reasoningResult = {
            selectedSong: selectedSong,
            heroShots: heroShots,
        };
        return reasoningResult;
    }
}
exports.ReasoningEngine = ReasoningEngine;


/***/ },

/***/ 7896
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = AIDirectorScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const ContextEngine_1 = __webpack_require__(833);
const DecisionEngine_1 = __webpack_require__(5454);
const PlanningEngine_1 = __webpack_require__(4561);
const ReasoningEngine_1 = __webpack_require__(9782);
const LearnStyleEngine_1 = __webpack_require__(3426);
const traceStore_1 = __webpack_require__(4992);
const loggerService_1 = __webpack_require__(2954);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
function AIDirectorScreen() {
    const baseSteps = 3;
    const decisionLoopBudget = 8;
    const [logs, setLogs] = (0, react_1.useState)((0, traceStore_1.getDirectorTrace)());
    const [isProcessing, setIsProcessing] = (0, react_1.useState)(false);
    const [styleProfiles, setStyleProfiles] = (0, react_1.useState)({});
    const [selectedStyle, setSelectedStyle] = (0, react_1.useState)("");
    const [completedSteps, setCompletedSteps] = (0, react_1.useState)(0);
    const [totalSteps, setTotalSteps] = (0, react_1.useState)(baseSteps + decisionLoopBudget);
    const [progressLabel, setProgressLabel] = (0, react_1.useState)("Idle");
    (0, react_1.useEffect)(() => {
        const learnStyleEngine = new LearnStyleEngine_1.LearnStyleEngine();
        setStyleProfiles(learnStyleEngine.getStyleProfiles());
        return (0, traceStore_1.subscribeDirectorTrace)((entries) => {
            setLogs(entries);
        });
    }, []);
    async function runEngine(engineInstance, logLabel, args) {
        const result = await engineInstance.run(args);
        (0, traceStore_1.appendDirectorTrace)(`${logLabel}: ${JSON.stringify(result, null, 2)}`);
        setCompletedSteps((current) => Math.min(baseSteps, current + 1));
        setProgressLabel(`${logLabel} complete`);
        return result;
    }
    async function handleCreateCinematicFilm() {
        setIsProcessing(true);
        setCompletedSteps(0);
        setTotalSteps(baseSteps + decisionLoopBudget);
        setProgressLabel("Starting AI Director");
        (0, traceStore_1.clearDirectorTrace)();
        loggerService_1.loggerService.log("AI Director run started.", "info");
        if (selectedStyle) {
            console.log(`[RK Flow] AI Director style profile: ${selectedStyle}`);
            (0, traceStore_1.appendDirectorTrace)(`Using style profile: ${selectedStyle}`);
        }
        try {
            const context = await runEngine(new ContextEngine_1.ContextEngine(), "Gathering context");
            const reasoningResult = await runEngine(new ReasoningEngine_1.ReasoningEngine(), "Reasoning", context);
            const planningResult = await runEngine(new PlanningEngine_1.PlanningEngine(), "Planning", { context, reasoningResult });
            const decisionResult = await new DecisionEngine_1.DecisionEngine().run({
                context,
                reasoningResult,
                planningResult,
                selectedStyle,
                onProgress: (progress) => {
                    setCompletedSteps(baseSteps + progress.completed);
                    setProgressLabel(progress.label);
                }
            });
            (0, traceStore_1.appendDirectorTrace)(`Decision: ${JSON.stringify(decisionResult, null, 2)}`);
            (0, traceStore_1.appendDirectorTrace)(`Final Output: ${JSON.stringify(decisionResult, null, 2)}`);
            loggerService_1.loggerService.log("AI Director run completed.", "success");
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("[RK Flow] AI Director failed:", error);
            (0, traceStore_1.appendDirectorTrace)(`Error: ${message}`);
            loggerService_1.loggerService.log(`AI Director run failed: ${message}`, "error");
        }
        finally {
            setIsProcessing(false);
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "AI Director", subtitle: "Context, planning, and auto-assembly for cinematic wedding edits.", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.md, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: isProcessing ? "Generating" : "Ready", tone: isProcessing ? "warning" : "success" }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: [Object.keys(styleProfiles).length, " learned style profile", Object.keys(styleProfiles).length === 1 ? "" : "s"] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm, marginTop: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "ai-director-style", style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: "Style profile" }), (0, jsx_runtime_1.jsxs)("select", { id: "ai-director-style", value: selectedStyle, onChange: (event) => setSelectedStyle(event.target.value), style: {
                                    width: "100%",
                                    boxSizing: "border-box",
                                    borderRadius: 10,
                                    border: `1px solid ${theme_1.colors.border}`,
                                    background: theme_1.colors.white,
                                    color: theme_1.colors.ink,
                                    padding: "10px 12px"
                                }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Default Style" }), Object.keys(styleProfiles).map((profileName) => ((0, jsx_runtime_1.jsx)("option", { value: profileName, children: profileName }, profileName)))] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md }, children: [isProcessing && ((0, jsx_runtime_1.jsx)("div", { style: { marginBottom: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: (completedSteps / totalSteps) * 100, label: `${completedSteps}/${totalSteps} steps • ${progressLabel}` }) })), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void handleCreateCinematicFilm(), disabled: isProcessing, children: isProcessing ? "Processing..." : "Create Cinematic Wedding Film" })] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Execution Log", subtitle: "Direct output from the Phase 3 orchestration engines.", children: (0, jsx_runtime_1.jsx)("div", { style: {
                        minHeight: 220,
                        maxHeight: 320,
                        overflow: "auto",
                        borderRadius: 10,
                        border: `1px solid ${theme_1.colors.border}`,
                        background: theme_1.colors.white,
                        padding: theme_1.spacing.sm
                    }, children: logs.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "Run AI Director to collect context, plan the film, and submit Premiere actions." })) : (logs.map((log, index) => ((0, jsx_runtime_1.jsx)("pre", { style: { margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", color: theme_1.colors.ink }, children: log }, `${index}-${log.slice(0, 16)}`)))) }) })] }));
}


/***/ },

/***/ 4992
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.getDirectorTrace = getDirectorTrace;
exports.clearDirectorTrace = clearDirectorTrace;
exports.appendDirectorTrace = appendDirectorTrace;
exports.subscribeDirectorTrace = subscribeDirectorTrace;
const listeners = new Set();
let traceEntries = [];
function getDirectorTrace() {
    return [...traceEntries];
}
function clearDirectorTrace() {
    traceEntries = [];
    emit();
}
function appendDirectorTrace(entry) {
    traceEntries = [...traceEntries, entry];
    emit();
}
function subscribeDirectorTrace(listener) {
    listeners.add(listener);
    listener(getDirectorTrace());
    return () => {
        listeners.delete(listener);
    };
}
function emit() {
    const snapshot = getDirectorTrace();
    listeners.forEach((listener) => listener(snapshot));
}


/***/ },

/***/ 3675
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = AnalyticsScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const GeminiService_1 = __webpack_require__(5449);
const metrics_1 = __webpack_require__(8928);
const systemStats_1 = __webpack_require__(1125);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
function AnalyticsScreen() {
    const [timelineMetrics, setTimelineMetrics] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        void (0, metrics_1.measureTimelineRead)().then((metrics) => {
            if (!cancelled) {
                setTimelineMetrics(metrics);
            }
        });
        return () => {
            cancelled = true;
        };
    }, []);
    const systemStats = (0, systemStats_1.getSystemStats)();
    const usageStats = (0, GeminiService_1.getGeminiUsageStats)();
    const recentCalls = (0, GeminiService_1.getRecentGeminiCalls)();
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "System Signals", subtitle: "Shared with the Phase 1 status bar.", style: { flex: "1 1 240px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `GPU ${systemStats.gpu}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `RAM ${systemStats.ram}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Timeline ${timelineMetrics ? `${timelineMetrics.latencyMs} ms` : "—"}`, tone: timelineMetrics?.error ? "warning" : "success" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted, lineHeight: 1.6 }, children: "GPU and RAM remain unavailable from the current host/runtime, so this screen intentionally mirrors the same honest `\u2014` values shown in the footer." })] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Timeline Performance", subtitle: "Measured from a real PremiereBridge timeline read.", style: { flex: "1 1 320px" }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: timelineMetrics?.timeline?.sequenceName || "No active sequence", tone: timelineMetrics?.timeline ? "success" : "warning" }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: ["Read latency: ", timelineMetrics ? `${timelineMetrics.latencyMs} ms` : "—"] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: ["Clips scanned: ", timelineMetrics?.clipCount ?? 0] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: ["Tracks: ", timelineMetrics?.timeline ? `${timelineMetrics.timeline.videoTracks.length} video / ${timelineMetrics.timeline.audioTracks.length} audio` : "—"] }), timelineMetrics?.error && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.danger }, children: timelineMetrics.error }))] }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Gemini Usage", subtitle: "Tracked inside GeminiService for real panel calls.", style: { flex: "1 1 280px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${usageStats.totalCalls} calls`, tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${usageStats.successfulCalls} success` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${usageStats.failedCalls} failed`, tone: usageStats.failedCalls > 0 ? "warning" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Avg ${usageStats.averageDurationMs} ms` })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted, lineHeight: 1.6 }, children: "Estimated API cost is not exposed by the current browser Gemini SDK response shape in this panel, so cost remains intentionally unavailable here." })] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Recent Calls", subtitle: "Bounded in-memory history of the latest Gemini requests.", style: { flex: "1 1 420px" }, children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: recentCalls.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "No Gemini calls recorded in this session yet." })) : (recentCalls.map((call) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                    border: `1px solid ${theme_1.colors.border}`,
                                    borderRadius: 10,
                                    background: theme_1.colors.white,
                                    padding: theme_1.spacing.sm,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: theme_1.spacing.xs
                                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontWeight: 700, color: theme_1.colors.maroonDeep }, children: [call.kind === "vision" ? "Vision" : "Text", " request"] }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: call.success ? "Success" : "Failed", tone: call.success ? "success" : "danger" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.xs }, children: [call.model, " \u2022 ", call.durationMs, " ms \u2022 ", new Date(call.startedAt).toLocaleTimeString()] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.ink, whiteSpace: "pre-wrap", wordBreak: "break-word" }, children: call.promptPreview }), call.errorMessage && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.danger }, children: call.errorMessage }))] }, call.id)))) }) })] })] }));
}


/***/ },

/***/ 8928
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.measureTimelineRead = measureTimelineRead;
const PremiereBridge_1 = __webpack_require__(1862);
const bridge = new PremiereBridge_1.PremiereBridge();
async function measureTimelineRead() {
    const started = performance.now();
    try {
        const timeline = await bridge.readTimeline();
        return {
            timeline,
            latencyMs: Math.round(performance.now() - started),
            error: null,
            clipCount: countTimelineClips(timeline)
        };
    }
    catch (error) {
        return {
            timeline: null,
            latencyMs: Math.round(performance.now() - started),
            error: error instanceof Error ? error.message : String(error),
            clipCount: 0
        };
    }
}
function countTimelineClips(timeline) {
    if (!timeline) {
        return 0;
    }
    return [...timeline.videoTracks, ...timeline.audioTracks].reduce((count, track) => count + track.clips.length, 0);
}


/***/ },

/***/ 8759
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.readAssetRecords = readAssetRecords;
exports.getCollections = getCollections;
exports.saveCollection = saveCollection;
exports.deleteCollection = deleteCollection;
const ClipManager_1 = __webpack_require__(2276);
const PremiereAPI_1 = __webpack_require__(868);
const brain_1 = __webpack_require__(7021);
const memory = new brain_1.MemoryEngine();
const COLLECTION_SCOPE = "asset-ai";
const COLLECTION_KEY = "collections";
async function readAssetRecords(context) {
    const projectAssets = await readProjectAssets();
    if (projectAssets.length > 0) {
        return {
            assets: enrichAssets(projectAssets, context),
            sourceNote: "Scanned active Premiere project items and merged cached AI tags."
        };
    }
    const selectedAssets = await readSelectedClipAssets();
    return {
        assets: enrichAssets(selectedAssets, context),
        sourceNote: selectedAssets.length > 0
            ? "Project-wide item scan was unavailable in this host session, so Asset AI is showing the current selection only."
            : "No readable project items or selected clips were available from Premiere."
    };
}
function getCollections() {
    return memory.getAnalysis(COLLECTION_SCOPE, COLLECTION_KEY) ?? [];
}
function saveCollection(name, assetIds) {
    const collections = getCollections();
    const next = {
        id: `${Date.now()}-${name.toLowerCase().replace(/\s+/g, "-")}`,
        name: name.trim(),
        assetIds,
        createdAt: new Date().toISOString()
    };
    memory.setAnalysis(COLLECTION_SCOPE, COLLECTION_KEY, [next, ...collections]);
}
function deleteCollection(collectionId) {
    const collections = getCollections().filter((collection) => collection.id !== collectionId);
    memory.setAnalysis(COLLECTION_SCOPE, COLLECTION_KEY, collections);
}
async function readProjectAssets() {
    try {
        const project = await PremiereAPI_1.premiereAPI.getCurrentProject();
        const rootItem = project?.rootItem ?? project?.getRootItem?.();
        const items = await collectProjectItems(rootItem);
        return dedupeAssets(items);
    }
    catch (error) {
        console.warn("[RK Flow] Asset AI could not enumerate project items.", error);
        return [];
    }
}
async function readSelectedClipAssets() {
    const clips = await ClipManager_1.clipManager.getSelectedClips();
    return Promise.all(clips.map(async (clip, index) => {
        const projectItemId = await readString(() => clip.projectItem?.getId?.());
        const nodeId = readNodeId(clip.projectItem);
        return {
            id: assetId(projectItemId ?? nodeId ?? clip.mediaType ?? clip.name, `${index}`),
            projectItemId,
            nodeId,
            parentId: null,
            ancestorIds: [],
            name: clip.name,
            type: clip.mediaType || clip.type || "clip",
            mediaPath: await readString(() => clip.projectItem?.getMediaPath?.()),
            source: "selection",
            clipId: `${clip.name}::${clip.track}::${clip.start.toFixed(3)}::${index}`,
            tags: [],
            duplicateGroup: null,
            metadata: {
                resolution: null,
                codec: null,
                durationSeconds: clip.duration,
                frameRate: null
            }
        };
    }));
}
async function collectProjectItems(rootItem, parentId = null, ancestorIds = []) {
    if (!rootItem) {
        return [];
    }
    const items = [];
    const children = await readProjectChildren(rootItem);
    for (let index = 0; index < children.length; index += 1) {
        const item = children[index];
        if (!item) {
            continue;
        }
        const type = await readItemType(item);
        const mediaPath = await readString(() => item.getMediaPath?.());
        const projectItemId = await readString(() => item.getId?.());
        const nodeId = readPlain(item.nodeId);
        const name = String(readPlain(item.name) ?? `Item ${index + 1}`);
        const metadata = await readMetadata(item);
        const assetKey = assetId(projectItemId ?? nodeId ?? name, mediaPath);
        if (type !== "bin" && type !== "root") {
            items.push({
                id: assetKey,
                projectItemId,
                nodeId: typeof nodeId === "string" ? nodeId : typeof nodeId === "number" ? String(nodeId) : null,
                parentId,
                ancestorIds,
                name,
                type,
                mediaPath,
                source: "project",
                clipId: null,
                tags: [],
                duplicateGroup: null,
                metadata
            });
        }
        if (type === "bin" || type === "root" || typeof item?.getItems === "function" || item?.children) {
            items.push({
                id: assetKey,
                projectItemId,
                nodeId: typeof nodeId === "string" ? nodeId : typeof nodeId === "number" ? String(nodeId) : null,
                parentId,
                ancestorIds,
                name,
                type,
                mediaPath,
                source: "project",
                clipId: null,
                tags: [],
                duplicateGroup: null,
                metadata
            });
            items.push(...(await collectProjectItems(item, assetKey, [...ancestorIds, assetKey])));
        }
    }
    return items;
}
async function readMetadata(item) {
    const resolution = await readResolution(item);
    const frameRate = await readFrameRate(item);
    const durationSeconds = await readDuration(item);
    const codec = await readCodec(item);
    return {
        resolution,
        codec,
        durationSeconds,
        frameRate
    };
}
async function readResolution(item) {
    const direct = (await readPlainAsync(item.getFrameSize?.bind(item))) ??
        (await readPlainAsync(item.getFootageInterpretation?.bind(item)));
    if (direct && typeof direct === "object") {
        const width = parseNumber(direct.width);
        const height = parseNumber(direct.height);
        if (width && height) {
            return `${width}x${height}`;
        }
    }
    const xmp = await readString(() => item.getXMPMetadata?.());
    if (!xmp) {
        return null;
    }
    const widthMatch = xmp.match(/frameSizeHorizontal[^>]*>(\d+)</i);
    const heightMatch = xmp.match(/frameSizeVertical[^>]*>(\d+)</i);
    if (widthMatch && heightMatch) {
        return `${widthMatch[1]}x${heightMatch[1]}`;
    }
    return null;
}
async function readFrameRate(item) {
    const interpretation = await readPlainAsync(item.getFootageInterpretation?.bind(item));
    if (interpretation && typeof interpretation === "object") {
        const frameRate = parseNumber(interpretation.frameRate);
        if (frameRate !== null) {
            return frameRate;
        }
    }
    return null;
}
async function readDuration(item) {
    const duration = await readPlainAsync(item.getOutPoint?.bind(item));
    if (duration && typeof duration === "object") {
        const ticks = parseNumber(duration.ticks);
        if (ticks !== null) {
            return ticks / 254016000000;
        }
    }
    return null;
}
async function readCodec(item) {
    const projectMetadata = await readString(() => item.getProjectMetadata?.());
    const xmpMetadata = await readString(() => item.getXMPMetadata?.());
    const metadata = `${projectMetadata ?? ""}\n${xmpMetadata ?? ""}`;
    const codecMatch = metadata.match(/codec[^>]*>([^<]+)</i) ??
        metadata.match(/CompressorName[^>]*>([^<]+)</i) ??
        metadata.match(/videoCodec[^>]*>([^<]+)</i);
    return codecMatch?.[1]?.trim() || null;
}
function enrichAssets(assets, context) {
    const sequenceKey = context?.sequenceKey ?? "";
    const wedding = sequenceKey ? memory.getAnalysis(`wedding-ai:${sequenceKey}`, "result") : null;
    const face = sequenceKey ? memory.getAnalysis(`face-ai:${sequenceKey}`, "result") : null;
    const emotion = sequenceKey ? memory.getAnalysis(`emotion-ai:${sequenceKey}`, "result") : null;
    const clipIntelligence = sequenceKey
        ? memory.getAnalysis(`clip-intelligence:${sequenceKey}`, "result")
        : null;
    return assets.map((asset) => {
        const clipId = asset.clipId ?? findClipIdForAsset(asset, context);
        const tags = new Set(asset.tags);
        if (clipId) {
            for (const segment of wedding?.segments ?? []) {
                if (segment.id === clipId || segment.id.includes(asset.name)) {
                    tags.add(segment.label);
                }
            }
            for (const cluster of face?.clusters ?? []) {
                if (cluster.clipIds.includes(clipId)) {
                    tags.add(cluster.role);
                    tags.add(cluster.label);
                }
            }
            const emotionHit = emotion?.clips.find((clip) => clip.clipId === clipId);
            for (const emotionTag of emotionHit?.emotions ?? []) {
                tags.add(emotionTag);
            }
        }
        const duplicateGroup = clipId
            ? clipIntelligence?.clips.find((clip) => clip.clipId === clipId)?.duplicateGroup ?? null
            : findDuplicateByPath(asset, assets);
        if (duplicateGroup) {
            tags.add("duplicate");
        }
        return {
            ...asset,
            clipId,
            tags: Array.from(tags).filter(Boolean).sort(),
            duplicateGroup
        };
    });
}
function findClipIdForAsset(asset, context) {
    return (context?.selectedClips.find((clip) => {
        if (asset.mediaPath && clip.name === asset.name) {
            return true;
        }
        return clip.name === asset.name;
    })?.id ?? null);
}
function findDuplicateByPath(asset, assets) {
    if (!asset.mediaPath) {
        return null;
    }
    const matches = assets.filter((candidate) => candidate.mediaPath === asset.mediaPath);
    return matches.length > 1 ? matches[0].id : null;
}
function dedupeAssets(items) {
    const deduped = new Map();
    for (const item of items) {
        deduped.set(item.id, item);
    }
    return Array.from(deduped.values()).sort((left, right) => left.name.localeCompare(right.name));
}
function assetId(primary, secondary) {
    return String(primary ?? secondary ?? `asset-${Math.random().toString(16).slice(2)}`);
}
async function readProjectChildren(item) {
    const getItems = item?.getItems;
    if (typeof getItems === "function") {
        try {
            const values = await getItems.call(item);
            return Array.isArray(values) ? values : [];
        }
        catch {
            return [];
        }
    }
    const children = item?.children;
    const count = typeof children?.numItems === "number" ? children.numItems : 0;
    const values = [];
    for (let index = 0; index < count; index += 1) {
        values.push(children[index]);
    }
    return values;
}
async function readItemType(item) {
    const type = readPlain(item.type);
    if (type === 2)
        return "bin";
    if (type === 3)
        return "root";
    if (type === 1 || type === 4)
        return "clip";
    return typeof type === "string" ? type : "clip";
}
function readPlain(value) {
    return typeof value === "string" || typeof value === "number" ? value : null;
}
function readNodeId(item) {
    const value = readPlain(item?.nodeId);
    return value === null ? null : String(value);
}
async function readPlainAsync(method) {
    if (!method) {
        return null;
    }
    try {
        return await method();
    }
    catch {
        return null;
    }
}
async function readString(method) {
    try {
        const value = await method();
        return typeof value === "string" && value.trim() ? value : null;
    }
    catch {
        return null;
    }
}
function parseNumber(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
}


/***/ },

/***/ 6830
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = AssetAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const useSequenceAnalysis_1 = __webpack_require__(8936);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const assetService_1 = __webpack_require__(8759);
function AssetAIScreen() {
    const [query, setQuery] = (0, react_1.useState)("");
    const [selectedAssetId, setSelectedAssetId] = (0, react_1.useState)(null);
    const [collectionName, setCollectionName] = (0, react_1.useState)("");
    const [selectedAssetIds, setSelectedAssetIds] = (0, react_1.useState)([]);
    const [collections, setCollections] = (0, react_1.useState)(() => (0, assetService_1.getCollections)());
    const { context, result, loading, progress, error, reanalyze } = (0, useSequenceAnalysis_1.useSequenceAnalysis)({
        moduleId: "asset-ai",
        analyze: async (sequenceContext, onProgress) => {
            onProgress("Reading project assets and cached tags...");
            return (0, assetService_1.readAssetRecords)(sequenceContext);
        }
    });
    (0, react_1.useEffect)(() => {
        setCollections((0, assetService_1.getCollections)());
    }, [result]);
    const assets = result?.assets ?? [];
    const filteredAssets = (0, react_1.useMemo)(() => {
        const term = query.trim().toLowerCase();
        if (!term) {
            return assets;
        }
        return assets.filter((asset) => {
            return (asset.name.toLowerCase().includes(term) ||
                asset.mediaPath?.toLowerCase().includes(term) ||
                asset.tags.some((tag) => tag.toLowerCase().includes(term)));
        });
    }, [assets, query]);
    const selectedAsset = filteredAssets.find((asset) => asset.id === selectedAssetId) ??
        assets.find((asset) => asset.id === selectedAssetId) ??
        null;
    function toggleAsset(assetId) {
        setSelectedAssetIds((current) => current.includes(assetId)
            ? current.filter((id) => id !== assetId)
            : [...current, assetId]);
    }
    function createCollection() {
        if (!collectionName.trim() || selectedAssetIds.length === 0) {
            return;
        }
        (0, assetService_1.saveCollection)(collectionName, selectedAssetIds);
        setCollectionName("");
        setSelectedAssetIds([]);
        setCollections((0, assetService_1.getCollections)());
    }
    function removeCollection(collectionId) {
        (0, assetService_1.deleteCollection)(collectionId);
        setCollections((0, assetService_1.getCollections)());
    }
    if (!context) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Asset AI", children: "Open a sequence to inspect Premiere assets." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Asset AI", subtitle: result?.sourceNote ?? "Project asset inspection", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Input, { placeholder: "Search by asset name, path, or tag", value: query, onChange: (event) => setQuery(event.target.value), style: { maxWidth: 320 } }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void reanalyze(), disabled: loading, children: "Refresh Assets" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [loading && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progress.percent, label: `${progress.completed}/${progress.total} steps` }), (0, jsx_runtime_1.jsx)("div", { style: { color: error ? theme_1.colors.danger : theme_1.colors.inkMuted }, children: error || progress.label })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md, alignItems: "flex-start" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: `Assets (${filteredAssets.length})`, subtitle: "Tags reuse cached Wedding AI, Face AI, Emotion AI, and Clip Intelligence results.", style: { flex: "2 1 520px" }, children: filteredAssets.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "No assets matched the current search. Project-wide scanning depends on host-readable project items; if unavailable, this screen falls back to the current selection." })) : ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: filteredAssets.map((asset) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setSelectedAssetId(asset.id), style: {
                                    width: "100%",
                                    textAlign: "left",
                                    borderRadius: 10,
                                    border: `1px solid ${selectedAssetId === asset.id ? theme_1.colors.gold : theme_1.colors.border}`,
                                    background: selectedAssetId === asset.id ? theme_1.colors.panelMuted : theme_1.colors.white,
                                    padding: theme_1.spacing.sm,
                                    cursor: "pointer"
                                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: asset.name }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.xs }, children: asset.mediaPath ?? "No media path exposed by this host item" })] }), (0, jsx_runtime_1.jsxs)("label", { style: { display: "inline-flex", alignItems: "center", gap: theme_1.spacing.xs }, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: selectedAssetIds.includes(asset.id), onChange: () => toggleAsset(asset.id), onClick: (event) => event.stopPropagation() }), "Collection"] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap", marginTop: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: asset.source === "project" ? "Project item" : "Selection fallback", tone: asset.source === "project" ? "success" : "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: asset.type }), asset.duplicateGroup && (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Duplicate candidate", tone: "warning" }), asset.tags.map((tag) => ((0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: tag }, `${asset.id}-${tag}`)))] })] }, asset.id))) })) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md, flex: "1 1 320px" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Metadata Panel", subtitle: "Only real host-exposed values are shown. Missing fields remain blank.", children: selectedAsset ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(MetaRow, { label: "Name", value: selectedAsset.name }), (0, jsx_runtime_1.jsx)(MetaRow, { label: "Path", value: selectedAsset.mediaPath ?? "—" }), (0, jsx_runtime_1.jsx)(MetaRow, { label: "Resolution", value: selectedAsset.metadata.resolution ?? "—" }), (0, jsx_runtime_1.jsx)(MetaRow, { label: "Codec", value: selectedAsset.metadata.codec ?? "—" }), (0, jsx_runtime_1.jsx)(MetaRow, { label: "Duration", value: selectedAsset.metadata.durationSeconds !== null
                                                ? `${selectedAsset.metadata.durationSeconds.toFixed(2)}s`
                                                : "—" }), (0, jsx_runtime_1.jsx)(MetaRow, { label: "Frame rate", value: selectedAsset.metadata.frameRate !== null
                                                ? `${selectedAsset.metadata.frameRate.toFixed(3)} fps`
                                                : "—" })] })) : ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "Choose an asset to inspect its metadata." })) }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Collections", subtitle: "Local-only grouping persisted in MemoryEngine.", children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Input, { placeholder: "Collection name", value: collectionName, onChange: (event) => setCollectionName(event.target.value) }), (0, jsx_runtime_1.jsxs)(primitives_1.Button, { onClick: createCollection, disabled: !collectionName.trim() || selectedAssetIds.length === 0, children: ["Save Collection (", selectedAssetIds.length, ")"] }), collections.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "No saved collections yet." })) : (collections.map((collection) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                border: `1px solid ${theme_1.colors.border}`,
                                                borderRadius: 10,
                                                padding: theme_1.spacing.sm,
                                                background: theme_1.colors.white
                                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: collection.name }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted, marginTop: theme_1.spacing.xs }, children: [collection.assetIds.length, " asset", collection.assetIds.length === 1 ? "" : "s", " \u2022 ", new Date(collection.createdAt).toLocaleString()] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: () => removeCollection(collection.id), children: "Delete Collection" }) })] }, collection.id))))] }) })] })] })] }));
}
function MetaRow({ label, value }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, borderBottom: `1px solid ${theme_1.colors.border}`, paddingBottom: theme_1.spacing.xs }, children: [(0, jsx_runtime_1.jsx)("span", { style: { color: theme_1.colors.inkMuted }, children: label }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_1.colors.ink, textAlign: "right", wordBreak: "break-word" }, children: value })] }));
}


/***/ },

/***/ 2426
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AudioAIEngine = void 0;
const PremiereExecutor_1 = __webpack_require__(7365);
const PremiereBridge_1 = __webpack_require__(1862);
const TimelineReader_1 = __webpack_require__(824);
class AudioAIEngine {
    executor = new PremiereExecutor_1.PremiereExecutor();
    timelineReader = new TimelineReader_1.TimelineReader(new PremiereBridge_1.PremiereBridge());
    async removeNoise(clip) {
        const resolvedClip = await this.resolveClip(clip, 0);
        if (!resolvedClip) {
            return "Select an audio clip in Premiere before removing noise.";
        }
        const result = await this.executor.runAction("REMOVE_NOISE", {
            clipId: resolvedClip
        });
        return result.success
            ? `Noise removal submitted to Premiere for ${resolvedClip}.`
            : `Noise removal failed: ${result.error ?? result.message}`;
    }
    async enhanceVoice(clip) {
        const resolvedClip = await this.resolveClip(clip, 0);
        if (!resolvedClip) {
            return "Select an audio clip in Premiere before enhancing voice.";
        }
        const result = await this.executor.runAction("ENHANCE_VOICE", {
            clipId: resolvedClip
        });
        return result.success
            ? `Voice enhancement submitted to Premiere for ${resolvedClip}.`
            : `Voice enhancement failed: ${result.error ?? result.message}`;
    }
    async autoDuck(mainClip, musicClip) {
        const resolvedMain = await this.resolveClip(mainClip, 0);
        const resolvedMusic = await this.resolveClip(musicClip, 1);
        if (!resolvedMain || !resolvedMusic) {
            return "Select two audio clips in Premiere before running Auto-Duck.";
        }
        const result = await this.executor.runAction("AUTO_DUCK", {
            mainClipId: resolvedMain,
            musicClipId: resolvedMusic
        });
        return result.success
            ? `Auto-duck submitted to Premiere for ${resolvedMusic}.`
            : `Auto-duck failed: ${result.error ?? result.message}`;
    }
    suggestSFX(clip) {
        console.log(`Suggesting SFX for ${clip}...`);
        return ["whoosh", "riser", "impact"];
    }
    async cleanupSpeech(clip) {
        const resolvedClip = await this.resolveClip(clip, 0);
        if (!resolvedClip) {
            return "Select an audio clip in Premiere before cleaning speech.";
        }
        const result = await this.executor.runAction("CLEANUP_SPEECH", {
            clipId: resolvedClip
        });
        return result.success
            ? `Speech cleanup submitted to Premiere for ${resolvedClip}.`
            : `Speech cleanup failed: ${result.error ?? result.message}`;
    }
    async resolveClip(clip, index) {
        if (clip) {
            return clip;
        }
        const selected = await this.timelineReader.getSelectedClips();
        return selected[index]?.id ?? null;
    }
}
exports.AudioAIEngine = AudioAIEngine;


/***/ },

/***/ 5336
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AutoEditAssembler = void 0;
const Command_1 = __webpack_require__(111);
const PremiereBridge_1 = __webpack_require__(1862);
const TimelineReader_1 = __webpack_require__(824);
const PremiereExecutor_1 = __webpack_require__(7365);
const templates_1 = __webpack_require__(6552);
class AutoEditAssembler {
    executor = new PremiereExecutor_1.PremiereExecutor();
    timelineReader = new TimelineReader_1.TimelineReader(new PremiereBridge_1.PremiereBridge());
    async assemble(templateName, clips = [], styleProfile, onProgress) {
        const template = templates_1.AUTO_EDIT_TEMPLATES.find(t => t.name === templateName);
        if (!template) {
            throw new Error(`Template not found: ${templateName}`);
        }
        const sourceClips = await this.resolveSourceClips(clips);
        if (sourceClips.length === 0) {
            throw new Error("Select timeline clips in Premiere or provide importable media paths before running Auto Edit.");
        }
        const sequenceName = this.buildSequenceName(template.name, styleProfile);
        const plan = this.buildAssemblyPlan(sequenceName, template, sourceClips);
        return this.executeAssemblyPlan(sequenceName, plan.clipPlans, plan.createSequenceCommand, onProgress);
    }
    async assembleReelPlan(plan, styleProfile, onProgress) {
        if (plan.clips.length === 0) {
            throw new Error("Generate a reel plan with at least one clip before assembly.");
        }
        const sequenceName = this.buildSequenceName(plan.title || plan.templateName, styleProfile);
        const clipPlans = plan.clips.map((clip, index) => {
            const commands = [];
            if (clip.mediaPath) {
                commands.push((0, Command_1.createCommand)("IMPORT_MEDIA", { mediaPath: clip.mediaPath }));
            }
            commands.push((0, Command_1.createCommand)("ADD_CLIP_TO_SEQUENCE", {
                clipId: clip.clipName,
                projectItemId: clip.projectItemId,
                mediaPath: clip.mediaPath,
                start: plan.clips
                    .slice(0, index)
                    .reduce((sum, entry) => sum + entry.durationSeconds, 0),
                end: clip.start + clip.durationSeconds,
                duration: clip.durationSeconds
            }));
            if (index < plan.clips.length - 1) {
                commands.push((0, Command_1.createCommand)("ADD_TRANSITION", {
                    type: transitionTypeForPromptReel(clip.reason),
                    start: plan.clips
                        .slice(0, index + 1)
                        .reduce((sum, entry) => sum + entry.durationSeconds, 0) - 0.4,
                    duration: 0.4
                }));
            }
            return { clip, commands };
        });
        return this.executeAssemblyPlan(sequenceName, clipPlans, (0, Command_1.createCommand)("CREATE_SEQUENCE", { name: sequenceName }), onProgress);
    }
    async executeAssemblyPlan(sequenceName, clipPlans, createSequenceCommand, onProgress) {
        const totalSteps = 1 +
            clipPlans.reduce((count, clipPlan) => count + clipPlan.commands.length, 0);
        const results = [];
        let completed = 0;
        onProgress?.({
            completed,
            total: totalSteps,
            label: `Creating sequence "${sequenceName}"`,
            percent: 0
        });
        const createResult = await this.executor.runNewSequenceAssembly(createSequenceCommand);
        results.push(createResult);
        this.throwOnFailedAction(createSequenceCommand.action, createResult);
        completed += 1;
        onProgress?.({
            completed,
            total: totalSteps,
            label: `Created sequence "${sequenceName}"`,
            percent: Math.round((completed / totalSteps) * 100)
        });
        for (let index = 0; index < clipPlans.length; index += 1) {
            const clipPlan = clipPlans[index];
            for (const command of clipPlan.commands) {
                const result = await this.executor.runNewSequenceAssembly(command);
                results.push(result);
                this.throwOnFailedAction(command.action, result, `clip ${index + 1}`);
                completed += 1;
            }
            onProgress?.({
                completed,
                total: totalSteps,
                label: `Placed clip ${index + 1} of ${clipPlans.length}`,
                percent: Math.round((completed / totalSteps) * 100)
            });
        }
        const failures = results.filter((result) => !result.success);
        if (failures.length > 0) {
            throw new Error(failures.map((result) => result.error ?? result.message).join(" "));
        }
        return `Submitted ${results.length} Premiere actions to build sequence "${sequenceName}".`;
    }
    throwOnFailedAction(action, result, context) {
        if (result.success) {
            return;
        }
        const detail = result.error ?? result.message;
        const label = context ? ` for ${context}` : "";
        console.error(`[RK Flow][Assembly] ${action}${label} failed.`, { result });
        throw new Error(`${action}${label} failed: ${detail}`);
    }
    buildSequenceName(templateName, styleProfile) {
        const styleSuffix = typeof styleProfile?.learnedFrom === "string"
            ? ` - ${styleProfile.learnedFrom}`
            : "";
        return `${templateName}${styleSuffix} - ${Date.now()}`;
    }
    buildAssemblyPlan(sequenceName, template, clips) {
        const targetDuration = (0, templates_1.parseDurationSeconds)(template.targetDuration);
        const selectedClips = this.selectClipsForTemplate(template, clips, targetDuration);
        let currentTime = 0;
        const clipPlans = [];
        for (const clip of selectedClips) {
            const commands = [];
            if (clip.path) {
                commands.push((0, Command_1.createCommand)("IMPORT_MEDIA", { mediaPath: clip.path }));
            }
            commands.push((0, Command_1.createCommand)(clip.type === "audio" ? "ADD_AUDIO_TO_SEQUENCE" : "ADD_CLIP_TO_SEQUENCE", {
                clipId: clip.id,
                mediaPath: clip.path,
                start: currentTime,
                end: clip.end,
                duration: clip.duration
            }));
            currentTime += clip.duration ?? Math.max(1, (clip.end ?? 0) - (clip.start ?? 0));
            if (currentTime > 0 && clip.type !== "audio") {
                commands.push((0, Command_1.createCommand)("ADD_TRANSITION", {
                    type: transitionTypeForTemplate(template),
                    start: Math.max(0, currentTime - 0.5),
                    duration: 0.5
                }));
            }
            clipPlans.push({ clip, commands });
        }
        return {
            createSequenceCommand: (0, Command_1.createCommand)("CREATE_SEQUENCE", { name: sequenceName }),
            clipPlans
        };
    }
    selectClipsForTemplate(template, clips, targetDuration) {
        const weighted = [...clips].sort((left, right) => (right.score ?? 0) - (left.score ?? 0));
        const chosen = [];
        let totalDuration = 0;
        for (const clip of weighted) {
            chosen.push(clip);
            totalDuration += clip.duration ?? Math.max(1, (clip.end ?? 0) - (clip.start ?? 0));
            if (targetDuration > 0 && totalDuration >= targetDuration) {
                break;
            }
        }
        return chosen.length > 0 ? chosen : clips.slice(0, Math.max(1, template.prioritizedSegments.length));
    }
    async resolveSourceClips(clips) {
        if (clips.length > 0) {
            return clips.map(normalizeClip);
        }
        const selectedClips = await this.timelineReader.getSelectedClips();
        return selectedClips.map((clip) => normalizeTimelineClip(clip));
    }
}
exports.AutoEditAssembler = AutoEditAssembler;
function normalizeClip(clip) {
    return {
        ...clip,
        type: clip.type ?? "video",
        duration: clip.duration ??
            Math.max(1, (clip.end ?? clip.start ?? 0) - (clip.start ?? 0))
    };
}
function normalizeTimelineClip(clip) {
    return {
        id: clip.id,
        path: clip.mediaPath ?? undefined,
        start: clip.start,
        end: clip.end,
        duration: clip.duration,
        score: clip.duration,
        type: "video"
    };
}
function transitionTypeForTemplate(template) {
    const intensity = template.beatSyncRules[0]?.intensity ?? "medium";
    switch (intensity) {
        case "high":
            return "dip_to_black";
        case "low":
            return "cross_dissolve";
        default:
            return "film_dissolve";
    }
}
function transitionTypeForPromptReel(reason) {
    if (/music energy|dance|energetic|wide/i.test(reason)) {
        return "dip_to_black";
    }
    if (/emotion|family|hug|reaction|bride entry|varmala/i.test(reason)) {
        return "cross_dissolve";
    }
    return "film_dissolve";
}


/***/ },

/***/ 6552
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AUTO_EDIT_TEMPLATES = void 0;
exports.parseDurationSeconds = parseDurationSeconds;
exports.AUTO_EDIT_TEMPLATES = [
    {
        name: "Reel",
        targetDuration: "1m",
        prioritizedSegments: ["Couple", "Highlights"],
        clipIntelligenceWeight: 0.8,
        emotionAIWeight: 0.7,
        beatSyncRules: [{ type: "auto", intensity: "high" }],
    },
    {
        name: "Shorts",
        targetDuration: "30s",
        prioritizedSegments: ["Couple", "Highlights"],
        clipIntelligenceWeight: 0.9,
        emotionAIWeight: 0.8,
        beatSyncRules: [{ type: "auto", intensity: "high" }],
    },
    {
        name: "Highlight",
        targetDuration: "3m",
        prioritizedSegments: ["Couple", "Ceremony", "Reception", "Highlights"],
        clipIntelligenceWeight: 0.7,
        emotionAIWeight: 0.7,
        beatSyncRules: [{ type: "auto", intensity: "medium" }],
    },
    {
        name: "Trailer",
        targetDuration: "1m30s",
        prioritizedSegments: ["Couple", "Ceremony", "Reception", "Highlights"],
        clipIntelligenceWeight: 0.75,
        emotionAIWeight: 0.85,
        beatSyncRules: [{ type: "auto", intensity: "high" }],
    },
    {
        name: "Teaser",
        targetDuration: "45s",
        prioritizedSegments: ["Couple", "Highlights"],
        clipIntelligenceWeight: 0.85,
        emotionAIWeight: 0.9,
        beatSyncRules: [{ type: "auto", intensity: "high" }],
    },
    {
        name: "Documentary",
        targetDuration: "15m",
        prioritizedSegments: ["Ceremony", "Reception", "Couple", "Family", "Highlights"],
        clipIntelligenceWeight: 0.6,
        emotionAIWeight: 0.6,
        beatSyncRules: [{ type: "manual", intensity: "low" }],
    },
    {
        name: "Couple Story",
        targetDuration: "5m",
        prioritizedSegments: ["Couple", "Highlights"],
        clipIntelligenceWeight: 0.8,
        emotionAIWeight: 0.9,
        beatSyncRules: [{ type: "auto", intensity: "medium" }],
    },
    {
        name: "Family Story",
        targetDuration: "7m",
        prioritizedSegments: ["Family", "Ceremony", "Reception"],
        clipIntelligenceWeight: 0.7,
        emotionAIWeight: 0.6,
        beatSyncRules: [{ type: "manual", intensity: "medium" }],
    },
    {
        name: "Cinematic Film",
        targetDuration: "20m",
        prioritizedSegments: ["Couple", "Ceremony", "Reception", "Family", "Highlights"],
        clipIntelligenceWeight: 0.75,
        emotionAIWeight: 0.8,
        beatSyncRules: [{ type: "manual", intensity: "high" }],
    },
    {
        name: "Same Day Edit",
        targetDuration: "3m",
        prioritizedSegments: ["Couple", "Ceremony", "Highlights"],
        clipIntelligenceWeight: 0.9,
        emotionAIWeight: 0.8,
        beatSyncRules: [{ type: "auto", intensity: "high" }],
    },
];
function parseDurationSeconds(value) {
    const match = value.match(/^(?:(\d+)m)?(?:(\d+)s)?$/i);
    if (!match) {
        return 0;
    }
    const minutes = Number(match[1] ?? 0);
    const seconds = Number(match[2] ?? 0);
    return minutes * 60 + seconds;
}


/***/ },

/***/ 8542
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoReelJobMemory = void 0;
const MemoryEngine_1 = __webpack_require__(1700);
const models_1 = __webpack_require__(5225);
const validation_1 = __webpack_require__(3492);
const JOB_SCOPE = "auto-reel:jobs";
const JOB_INDEX_KEY = "index";
class AutoReelJobMemory {
    memory;
    constructor(memory = new MemoryEngine_1.MemoryEngine()) {
        this.memory = memory;
    }
    save(job) {
        const validation = (0, validation_1.validatePersistedAutoReelJob)(job);
        if (!validation.valid || !validation.value) {
            throw new Error(`Refusing to persist invalid Auto Reel job: ${validation.issues.map((issue) => issue.path).join(", ")}`);
        }
        this.memory.setAnalysis(JOB_SCOPE, job.id, validation.value);
        const ids = this.listIds().filter((id) => id !== job.id);
        this.memory.setAnalysis(JOB_SCOPE, JOB_INDEX_KEY, [job.id, ...ids].slice(0, 25));
    }
    get(jobId) {
        const stored = this.memory.getAnalysis(JOB_SCOPE, jobId);
        const validation = (0, validation_1.validatePersistedAutoReelJob)(stored);
        return validation.valid && validation.value ? validation.value : null;
    }
    list() {
        return this.listIds()
            .map((jobId) => this.get(jobId))
            .filter((job) => job !== null);
    }
    transition(jobId, nextState, reason) {
        const job = this.get(jobId);
        if (!job) {
            throw new Error(`Auto Reel job not found: ${jobId}`);
        }
        const updated = (0, models_1.transitionAutoReelJob)(job, nextState, { reason });
        this.save(updated);
        return updated;
    }
    listIds() {
        const stored = this.memory.getAnalysis(JOB_SCOPE, JOB_INDEX_KEY);
        return Array.isArray(stored) && stored.every((value) => typeof value === "string")
            ? stored
            : [];
    }
}
exports.AutoReelJobMemory = AutoReelJobMemory;


/***/ },

/***/ 8904
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = AutoReelScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const autoReelExtractionService_1 = __webpack_require__(578);
const autoReelScanner_1 = __webpack_require__(9652);
const autoReelSetupConfig_1 = __webpack_require__(8489);
const autoReelSetupService_1 = __webpack_require__(1676);
const AutoReelSections_1 = __webpack_require__(716);
const AutoReelUi_1 = __webpack_require__(2390);
function AutoReelScreen() {
    const rootRef = (0, react_1.useRef)(null);
    const runAbortRef = (0, react_1.useRef)(null);
    const [context, setContext] = (0, react_1.useState)(null);
    const [projectId, setProjectId] = (0, react_1.useState)("");
    const [sequenceId, setSequenceId] = (0, react_1.useState)("");
    const [state, setState] = (0, react_1.useState)(() => (0, autoReelSetupConfig_1.createDefaultAutoReelSetupState)());
    const [job, setJob] = (0, react_1.useState)(null);
    const [requestPreview, setRequestPreview] = (0, react_1.useState)("");
    const [planningText, setPlanningText] = (0, react_1.useState)("Idle. Configure Auto Reel setup to serialize a request for Phase 4 extraction.");
    const [log, setLog] = (0, react_1.useState)(["Waiting for Premiere context..."]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [running, setRunning] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    const [panelWidth, setPanelWidth] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        void refreshContext();
    }, []);
    (0, react_1.useEffect)(() => {
        const node = rootRef.current;
        if (!node) {
            return;
        }
        const syncWidth = () => {
            const nextWidth = Math.round(node.getBoundingClientRect().width);
            if (nextWidth > 0) {
                setPanelWidth((current) => (current === nextWidth ? current : nextWidth));
            }
        };
        syncWidth();
        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", syncWidth);
            return () => window.removeEventListener("resize", syncWidth);
        }
        const resizeObserver = new ResizeObserver(() => syncWidth());
        resizeObserver.observe(node);
        return () => resizeObserver.disconnect();
    }, []);
    const workspaceWidth = (0, react_1.useMemo)(() => (0, autoReelSetupConfig_1.getAutoReelEffectiveWidth)(panelWidth, window.innerWidth), [panelWidth]);
    const layoutMode = (0, react_1.useMemo)(() => (0, autoReelSetupConfig_1.getAutoReelLayoutMode)(workspaceWidth), [workspaceWidth]);
    const fieldBasis = (0, autoReelSetupConfig_1.fieldFlex)(layoutMode);
    const errors = (0, react_1.useMemo)(() => (0, autoReelSetupConfig_1.validateAutoReelSetupState)(state, {
        availableClipCount: context?.clipCount ?? 0,
        selectedClipCount: context?.selectedClipCount ?? 0,
        availableProjectItemIds: context?.projectItemOptions.map((item) => item.id) ?? [],
        availableManualClipIds: context?.manualClipOptions.map((clip) => clip.id) ?? []
    }), [context, state]);
    async function refreshContext() {
        setLoading(true);
        setError("");
        try {
            const nextContext = await (0, autoReelSetupService_1.loadAutoReelSetupContext)();
            const draft = (0, autoReelSetupService_1.loadAutoReelSetupDraft)();
            const nextState = (0, autoReelSetupService_1.createSetupStateFromDraft)(draft, nextContext);
            setContext(nextContext);
            setProjectId(draft?.projectId || nextContext.activeProjectId);
            setSequenceId(draft?.sequenceId || nextContext.activeSequenceId);
            setState(nextState);
            setPlanningText(buildPlanningText(nextState, nextContext, "idle"));
            setLog([`Loaded Premiere context for ${nextContext.projectName || "Unknown Project"} / ${nextContext.sequenceName || "No active sequence"}.`]);
            setRequestPreview(JSON.stringify((0, autoReelSetupConfig_1.serializeAutoReelSetupIntoRequest)(nextState, buildRequestBase(nextState, nextContext)), null, 2));
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not read Premiere context.");
            setLog(["Could not load Premiere context."]);
        }
        finally {
            setLoading(false);
        }
    }
    function patchState(patch) {
        setState((current) => {
            const next = { ...current, ...patch };
            if (context) {
                setPlanningText(buildPlanningText(next, context, running ? "loading" : "idle"));
                setRequestPreview(JSON.stringify((0, autoReelSetupConfig_1.serializeAutoReelSetupIntoRequest)(next, buildRequestBase(next, context)), null, 2));
            }
            return next;
        });
    }
    function toggleListValue(key, value) {
        setState((current) => {
            const list = current[key];
            const nextList = list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
            const next = { ...current, [key]: nextList };
            if (context) {
                setPlanningText(buildPlanningText(next, context, running ? "loading" : "idle"));
                setRequestPreview(JSON.stringify((0, autoReelSetupConfig_1.serializeAutoReelSetupIntoRequest)(next, buildRequestBase(next, context)), null, 2));
            }
            return next;
        });
    }
    function updateReference(referenceId, update) {
        setState((current) => {
            const next = {
                ...current,
                references: current.references.map((reference) => reference.id === referenceId ? { ...reference, ...update } : reference)
            };
            if (context) {
                setPlanningText(buildPlanningText(next, context, running ? "loading" : "idle"));
                setRequestPreview(JSON.stringify((0, autoReelSetupConfig_1.serializeAutoReelSetupIntoRequest)(next, buildRequestBase(next, context)), null, 2));
            }
            return next;
        });
    }
    function addCustomReference() {
        setState((current) => ({
            ...current,
            references: [
                ...current.references,
                {
                    id: `custom-reference-${Date.now()}`,
                    role: "custom",
                    label: `Custom Person ${current.references.filter((reference) => reference.role === "custom").length + 1}`
                }
            ]
        }));
    }
    function removeReference(referenceId) {
        setState((current) => ({
            ...current,
            references: current.references.filter((reference) => reference.id !== referenceId)
        }));
    }
    async function handleRunSetup() {
        if (!context) {
            setError("Premiere context is not ready yet.");
            return;
        }
        if (errors.general.length > 0 || Object.keys(errors.fields).length > 0) {
            setError("Fix the inline setup errors before starting Auto Reel.");
            setPlanningText(buildPlanningText(state, context, "error"));
            return;
        }
        setRunning(true);
        setError("");
        setPlanningText("Preparing Phase 4 real timeline/media scan and extraction.");
        setLog(["Starting real timeline/media scan..."]);
        const controller = new AbortController();
        runAbortRef.current = controller;
        try {
            const result = await (0, autoReelSetupService_1.runAutoReelSetup)({
                projectId,
                sequenceId,
                state,
                signal: controller.signal,
                onProgress: (update) => {
                    setJob(update.job);
                    setLog(update.log);
                    setPlanningText(update.planningText);
                    setRequestPreview(JSON.stringify(update.job.request, null, 2));
                }
            });
            setContext(result.context);
            setJob(result.job);
            setLog(result.log);
            setRequestPreview(JSON.stringify(result.request, null, 2));
            setPlanningText(result.planningText);
        }
        catch (cause) {
            if ((0, autoReelScanner_1.isAutoReelScanCancelledError)(cause) || (0, autoReelExtractionService_1.isAutoReelExtractionCancelledError)(cause)) {
                setError("");
                setPlanningText("Auto Reel extraction cancelled before later analysis phases.");
            }
            else {
                const message = cause instanceof Error ? cause.message : "Auto Reel setup failed.";
                setError(message);
                setLog((current) => [...current, message]);
                setPlanningText(buildPlanningText(state, context, "error"));
            }
        }
        finally {
            runAbortRef.current = null;
            setRunning(false);
        }
    }
    function handleCancelRun() {
        runAbortRef.current?.abort();
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: rootRef, style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.lg, minWidth: 0, width: "100%" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Auto Reel", subtitle: "Phase 4 frame/audio extraction inside the existing workstation. This screen reads truthful host metadata, runs local-only extraction when approved paths exist, and stops before Vision AI, Music AI, planning, or execution.", style: AutoReelUi_1.glassCardStyle, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: loading ? "Loading context" : context?.connected ? "Premiere connected" : "Premiere not ready", tone: loading ? "warning" : context?.connected ? "success" : "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: context?.projectName || "No active project", tone: context?.projectName ? "neutral" : "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: context?.sequenceName || "No active sequence", tone: context?.sequenceName ? "neutral" : "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Layout ${layoutMode}`, tone: "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: job ? `Setup ${job.state}` : "Setup idle", tone: job ? "success" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: job?.extraction?.sidecar.status === "available" ? "Sidecar available" : "Sidecar unavailable", tone: job?.extraction?.sidecar.status === "available" ? "success" : "danger" })] }) }), (0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsx)(AutoReelSections_1.AutoReelSourceSection, { context: context, projectId: projectId, sequenceId: sequenceId, state: state, fieldBasis: fieldBasis, loading: loading, running: running, errors: errors, onProjectId: setProjectId, onSequenceId: setSequenceId, onPatchState: patchState, onToggleListValue: toggleListValue }) }), (0, jsx_runtime_1.jsx)(AutoReelSections_1.AutoReelConfigurationSection, { state: state, fieldBasis: fieldBasis, loading: loading, running: running, errors: errors, onPatchState: patchState }), (0, jsx_runtime_1.jsx)(AutoReelSections_1.MusicSourcePicker, { context: context, state: state, fieldBasis: fieldBasis, loading: loading, running: running, errors: errors, onPatchState: patchState }), (0, jsx_runtime_1.jsx)(AutoReelSections_1.PersonReferenceManager, { state: state, layoutMode: layoutMode, loading: loading, running: running, onUpdateReference: updateReference, onAddCustomReference: addCustomReference, onRemoveReference: removeReference }), (0, jsx_runtime_1.jsx)(AutoReelSections_1.ReferenceReelInput, { state: state, fieldBasis: fieldBasis, loading: loading, running: running, error: errors.fields.referenceReel, onPatchState: patchState }), (0, jsx_runtime_1.jsx)(AutoReelSections_1.AutoReelPlanningPanel, { planningText: planningText, phases: buildPhaseRows(job, running, error), error: error }), (0, jsx_runtime_1.jsx)(AutoReelSections_1.AutoReelRequestPreview, { job: job, panelWidth: workspaceWidth, requestPreview: requestPreview, log: log }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void handleRunSetup(), disabled: loading || running || !context?.connected, children: running ? "Running Extraction..." : "Start Auto Reel Extraction" }), running && ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: handleCancelRun, children: "Cancel Extraction" })), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void refreshContext(), disabled: loading || running, children: "Refresh Premiere Context" })] })] }));
}
function buildRequestBase(state, context) {
    return {
        id: "preview-request",
        prompt: `Prepare ${state.reelType} setup for ${context.sequenceName || "Auto Reel"}.`,
        mediaSelection: {
            mode: state.sourceMode,
            projectId: context.activeProjectId,
            sequenceId: context.activeSequenceId,
            sequenceName: context.sequenceName,
            clipIds: [],
            projectItemIds: state.selectedProjectItemIds,
            inPointSeconds: context.inPointSeconds,
            outPointSeconds: context.outPointSeconds,
            usedFallback: false,
            sequenceResolution: context.frameSize,
            fps: context.fps || null,
            timebase: context.timebase,
            playheadSeconds: context.timeline?.playhead ?? null,
            selectedClipCount: context.selectedClipCount,
            scannedClipCount: 0,
            mediaFingerprint: "preview-request",
            cacheKey: "preview-request",
            capabilityNotes: []
        },
        targetDurationSeconds: state.targetDurationSeconds,
        outputSequenceName: state.outputSequenceName.trim() || "Auto Reel",
        styleHints: [state.style, state.storyMode, state.energy],
        preferredEvents: [],
        excludedClipIds: [],
        submittedAt: new Date("2026-08-04T00:00:00.000Z").toISOString()
    };
}
function buildPlanningText(state, context, status) {
    const base = [
        `${(0, AutoReelUi_1.titleCase)(state.reelType)} scanner for ${context.sequenceName || "no active sequence"}.`,
        `Source mode: ${state.sourceMode.replaceAll("-", " ")}.`,
        `Target duration: ${state.targetDurationSeconds}s at ${state.aspectRatio}.`,
        `Style: ${state.style}. Story mode: ${state.storyMode}. Energy: ${state.energy}.`,
        `Music mode: ${state.musicSourceMode}. Clip audio extraction: ${state.extractClipAudio ? "requested" : "disabled"}. Output sequence: ${state.outputSequenceName || "Auto Reel"}.`
    ].join(" ");
    if (status === "loading") {
        return `${base} Real timeline/media scanning and approved-path extraction are running with truthful host metadata only.`;
    }
    if (status === "success") {
        return `${base} Real scanning and extraction completed successfully. Vision AI, Music AI, and planning are still pending approval and have not run yet.`;
    }
    if (status === "error") {
        return `${base} Scanning or extraction is blocked by validation or runtime errors. No later analysis results were generated.`;
    }
    return `${base} No real scan has run yet. This panel prepares the Phase 4 extraction request and setup state.`;
}
function buildPhaseRows(job, running, error) {
    const state = job?.state ?? "idle";
    return [
        phaseRow("Setup Validation", running || state !== "idle" ? (error ? "error" : state === "idle" ? "idle" : "success") : "idle", "Validates durations, URLs, clip-count rules, and source choices."),
        phaseRow("Timeline Scan", state === "scanning" ? "loading" : state === "extracting" || state === "awaiting_review" ? "success" : "idle", "Reads selected clips, sequence clips, In/Out overlaps, and project-item matches from the active Premiere host."),
        phaseRow("Descriptor Capture", state === "extracting" || state === "awaiting_review" ? "success" : running ? "loading" : "idle", "Serializes truthful ClipDescriptor and MediaSelection output with capability notes and cache keys."),
        phaseRow("Frame / Audio Extraction", state === "extracting" ? "loading" : state === "awaiting_review" ? "success" : "idle", "Extracts sampled frames and audio proxies only from approved verified local paths, with truthful cache and fallback reporting."),
        phaseRow("Reference Capture", job ? "success" : "idle", "Stores music, people, and reference-reel metadata only. No face, emotion, wedding, music, scoring, or planning analysis runs yet."),
        phaseRow("Phase 5+ Analysis", state === "awaiting_review" ? "idle" : "idle", "Not started in this phase.")
    ];
}
function phaseRow(title, status, detail) {
    return {
        title,
        status,
        detail,
        tone: status === "success"
            ? "success"
            : status === "loading"
                ? "warning"
                : status === "error"
                    ? "danger"
                    : "neutral"
    };
}


/***/ },

/***/ 716
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.zc = exports.bC = exports.A6 = exports.F2 = exports.K6 = exports.mQ = exports.FC = exports.dp = exports.ui = exports.U$ = exports.bK = void 0;
exports.AutoReelSourceSection = AutoReelSourceSection;
exports.AutoReelConfigurationSection = AutoReelConfigurationSection;
exports.MusicSourcePicker = MusicSourcePicker;
exports.PersonReferenceManager = PersonReferenceManager;
exports.ReferenceReelInput = ReferenceReelInput;
exports.AutoReelPlanningPanel = AutoReelPlanningPanel;
exports.AutoReelRequestPreview = AutoReelRequestPreview;
const jsx_runtime_1 = __webpack_require__(4848);
const primitives_1 = __webpack_require__(5613);
const autoReelSetupConfig_1 = __webpack_require__(8489);
const AutoReelUi_1 = __webpack_require__(2390);
const theme_1 = __webpack_require__(3877);
exports.bK = [
    { value: "wedding-highlight", label: "Wedding Highlight" },
    { value: "cinematic-reel", label: "Cinematic Reel" },
    { value: "emotional-reel", label: "Emotional Reel" },
    { value: "couple-reel", label: "Couple Reel" },
    { value: "dance-reel", label: "Dance Reel" },
    { value: "reception-reel", label: "Reception Reel" }
];
exports.U$ = [15, 30, 45, 60, 75, 90, 120, 180];
exports.ui = ["9:16", "16:9", "1:1", "4:5"];
exports.dp = ["signature", "luxury", "documentary", "viral", "classic"];
exports.FC = ["story", "emotion", "music", "viral", "documentary", "cinematic"];
exports.mQ = ["low", "balanced", "high"];
exports.K6 = ["calm", "balanced", "high"];
exports.F2 = ["sparse", "balanced", "rapid"];
exports.A6 = ["bride", "groom", "family", "balanced"];
exports.bC = [
    { value: "selected-clips", label: "Selected timeline clips" },
    { value: "active-sequence", label: "Active sequence" },
    { value: "in-out-range", label: "Sequence In / Out" },
    { value: "project-items", label: "Selected Project panel items / bin" },
    { value: "manual-selection", label: "Manual selection" }
];
exports.zc = [
    { value: "none", label: "No-music planning mode" },
    { value: "local-file", label: "Local audio file" },
    { value: "project-item", label: "Premiere project item" },
    { value: "authorized-direct-url", label: "Authorized direct URL" },
    { value: "social-reference", label: "Social link reference-only" }
];
function AutoReelSourceSection({ context, projectId, sequenceId, state, fieldBasis, loading, running, errors, onProjectId, onSequenceId, onPatchState, onToggleListValue }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Media Source Controls", subtitle: "Choose the Premiere source set and clip-range rules. Phase 4 scanning applies these filters to real timeline metadata.", style: { ...AutoReelUi_1.glassCardStyle, flex: "1 1 100%", minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: AutoReelUi_1.formRowStyle, children: [(0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Project selection", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: projectId, onChange: (event) => onProjectId(event.target.value), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: context?.projectOptions.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option.id, children: option.name }, option.id))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Sequence selection", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: sequenceId, onChange: (event) => onSequenceId(event.target.value), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: context?.sequenceOptions.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option.id, children: option.name }, option.id))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Source mode", flex: fieldBasis, error: errors.fields.sourceMode, children: (0, jsx_runtime_1.jsx)("select", { value: state.sourceMode, onChange: (event) => onPatchState({ sourceMode: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.bC.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option.value, children: option.label }, option.value))) }) }), (0, jsx_runtime_1.jsxs)(AutoReelUi_1.Field, { label: "Include locked tracks", flex: fieldBasis, children: [(0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.checkboxRowStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: state.includeLockedTracks, onChange: (event) => onPatchState({ includeLockedTracks: event.target.checked }), disabled: loading || running }), (0, jsx_runtime_1.jsx)("span", { children: "Record locked-track preference" })] }), (0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.helperTextStyle, children: "Current Premiere runtime does not expose locked-track state, so this remains a serialized preference only." })] }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Include disabled clips", flex: fieldBasis, children: (0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.checkboxRowStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: state.includeDisabledClips, onChange: (event) => onPatchState({ includeDisabledClips: event.target.checked }), disabled: loading || running }), (0, jsx_runtime_1.jsx)("span", { children: "Keep disabled track items in the scan result" })] }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Include audio-only items", flex: fieldBasis, children: (0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.checkboxRowStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: state.includeAudioOnlyItems, onChange: (event) => onPatchState({ includeAudioOnlyItems: event.target.checked }), disabled: loading || running }), (0, jsx_runtime_1.jsx)("span", { children: "Keep audio-only clips when the host exposes them" })] }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Include still items", flex: fieldBasis, children: (0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.checkboxRowStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: state.includeStillItems, onChange: (event) => onPatchState({ includeStillItems: event.target.checked }), disabled: loading || running }), (0, jsx_runtime_1.jsx)("span", { children: "Keep still-image items when identifiable" })] }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Minimum clip count", flex: fieldBasis, error: errors.fields.clipCountRange, children: (0, jsx_runtime_1.jsx)(primitives_1.Input, { type: "number", min: 1, value: state.minimumClipCount, onChange: (event) => onPatchState({ minimumClipCount: Number(event.target.value) || 0 }), disabled: loading || running }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Maximum clip count", flex: fieldBasis, error: errors.fields.clipCountRange, children: (0, jsx_runtime_1.jsx)(primitives_1.Input, { type: "number", min: 1, value: state.maximumClipCount, onChange: (event) => onPatchState({ maximumClipCount: Number(event.target.value) || 0 }), disabled: loading || running }) })] }), state.sourceMode === "project-items" && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Project panel items / bin selection", error: errors.fields.selectedProjectItemIds, children: (0, jsx_runtime_1.jsx)(AutoReelUi_1.SelectionGrid, { children: context?.projectItemOptions.map((item) => ((0, jsx_runtime_1.jsx)(AutoReelUi_1.SelectableChip, { active: state.selectedProjectItemIds.includes(item.id), onClick: () => onToggleListValue("selectedProjectItemIds", item.id), label: `${item.label} (${item.type})` }, item.id))) }) }) })), state.sourceMode === "manual-selection" && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Manual clip selection", error: errors.fields.manualClipIds, children: (0, jsx_runtime_1.jsx)(AutoReelUi_1.SelectionGrid, { children: context?.manualClipOptions.map((clip) => ((0, jsx_runtime_1.jsx)(AutoReelUi_1.SelectableChip, { active: state.manualClipIds.includes(clip.id), onClick: () => onToggleListValue("manualClipIds", clip.id), label: clip.label }, clip.id))) }) }) }))] }) }));
}
function AutoReelConfigurationSection({ state, fieldBasis, loading, running, errors, onPatchState }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Reel Configuration", subtitle: "Set the structure, pacing, priorities, and new-sequence output metadata.", style: { ...AutoReelUi_1.glassCardStyle, flex: "1 1 100%", minWidth: 0 }, children: (0, jsx_runtime_1.jsxs)("div", { style: AutoReelUi_1.formRowStyle, children: [(0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Reel type / mode", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.reelType, onChange: (event) => onPatchState({ reelType: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.bK.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option.value, children: option.label }, option.value))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Target duration", flex: fieldBasis, error: errors.fields.targetDurationSeconds, children: (0, jsx_runtime_1.jsx)("select", { value: String(state.targetDurationSeconds), onChange: (event) => onPatchState({ targetDurationSeconds: Number(event.target.value) }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.U$.map((seconds) => ((0, jsx_runtime_1.jsxs)("option", { value: seconds, children: [seconds, " seconds"] }, seconds))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Aspect ratio", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.aspectRatio, onChange: (event) => onPatchState({ aspectRatio: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.ui.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: option }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Style", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.style, onChange: (event) => onPatchState({ style: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.dp.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Story mode", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.storyMode, onChange: (event) => onPatchState({ storyMode: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.FC.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Emotion priority", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.emotionPriority, onChange: (event) => onPatchState({ emotionPriority: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.mQ.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Bride / groom / family balance", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.balanceTarget, onChange: (event) => onPatchState({ balanceTarget: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.A6.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Energy", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.energy, onChange: (event) => onPatchState({ energy: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.K6.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Cut density", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.cutDensity, onChange: (event) => onPatchState({ cutDensity: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.F2.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Transition intensity", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.transitionIntensity, onChange: (event) => onPatchState({ transitionIntensity: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.mQ.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Motion intensity", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.motionIntensity, onChange: (event) => onPatchState({ motionIntensity: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.mQ.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "SFX intensity", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.sfxIntensity, onChange: (event) => onPatchState({ sfxIntensity: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.mQ.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Color intensity", flex: fieldBasis, children: (0, jsx_runtime_1.jsx)("select", { value: state.colorIntensity, onChange: (event) => onPatchState({ colorIntensity: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.mQ.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option, children: (0, AutoReelUi_1.titleCase)(option) }, option))) }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Output sequence name", flex: fieldBasis, error: errors.fields.outputSequenceName, children: (0, jsx_runtime_1.jsx)(primitives_1.Input, { value: state.outputSequenceName, onChange: (event) => onPatchState({ outputSequenceName: event.target.value }), disabled: loading || running }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Create new sequence", flex: fieldBasis, children: (0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.checkboxRowStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: true, readOnly: true }), (0, jsx_runtime_1.jsx)("span", { children: "Enabled by default and required" })] }) })] }) }) }));
}
function MusicSourcePicker({ context, state, fieldBasis, loading, running, errors, onPatchState }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "MusicSourcePicker", subtitle: "Configure a music input or reference mode. No copyrighted media is downloaded from social links.", style: { ...AutoReelUi_1.glassCardStyle, flex: "1 1 100%", minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)("div", { style: AutoReelUi_1.formRowStyle, children: [(0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Music source", flex: fieldBasis, error: errors.fields.musicSource, children: (0, jsx_runtime_1.jsx)("select", { value: state.musicSourceMode, onChange: (event) => onPatchState({ musicSourceMode: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: exports.zc.map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option.value, children: option.label }, option.value))) }) }), state.musicSourceMode === "local-file" && ((0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Local audio file", flex: fieldBasis, error: errors.fields.musicSource, children: (0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.uploadLabelStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: state.musicLocalFileName || "Choose local audio file" }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "audio/*", style: { display: "none" }, onChange: (event) => {
                                            const file = event.target.files?.[0];
                                            onPatchState({
                                                musicLocalFileName: file?.name ?? "",
                                                musicLocalFilePath: file?.path ?? ""
                                            });
                                        }, disabled: loading || running })] }) })), state.musicSourceMode === "project-item" && ((0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Premiere project item", flex: fieldBasis, error: errors.fields.musicSource, children: (0, jsx_runtime_1.jsxs)("select", { value: state.musicProjectItemId, onChange: (event) => onPatchState({ musicProjectItemId: event.target.value }), style: AutoReelUi_1.fieldStyle, disabled: loading || running, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select audio project item" }), context?.musicOptions.filter((option) => option.source === "project-item").map((option) => ((0, jsx_runtime_1.jsx)("option", { value: option.id, children: option.label }, option.id)))] }) })), state.musicSourceMode === "authorized-direct-url" && ((0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Authorized direct URL", flex: fieldBasis, error: errors.fields.musicSource, children: (0, jsx_runtime_1.jsx)(primitives_1.Input, { value: state.musicDirectUrl, onChange: (event) => onPatchState({ musicDirectUrl: event.target.value }), placeholder: "https://example.com/music-track.mp3", disabled: loading || running }) })), state.musicSourceMode === "social-reference" && ((0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Social link reference-only", flex: fieldBasis, error: errors.fields.musicSource, children: (0, jsx_runtime_1.jsx)(primitives_1.Input, { value: state.musicSocialReferenceUrl, onChange: (event) => onPatchState({ musicSocialReferenceUrl: event.target.value }), placeholder: "https://instagram.com/reel/... or https://youtube.com/shorts/...", disabled: loading || running }) }))] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexWrap: "wrap", gap: theme_1.spacing.sm, alignItems: "center" }, children: [(0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.checkboxRowStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: state.extractClipAudio, onChange: (event) => onPatchState({ extractClipAudio: event.target.checked }), disabled: loading || running }), (0, jsx_runtime_1.jsx)("span", { children: "Also extract clip audio proxies for selected clips." })] }), (0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.checkboxRowStyle, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: state.copyrightNoticeAccepted, onChange: (event) => onPatchState({ copyrightNoticeAccepted: event.target.checked }), disabled: loading || running }), (0, jsx_runtime_1.jsx)("span", { children: "I confirm that any uploaded or linked music is licensed or reference-only." })] })] }), (0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.helperTextStyle, children: "Direct URLs must point to authorized media files. Social links are stored as reference-only and are never treated as a licensed source track by this Phase 4 workflow. Clip-audio extraction runs only when explicitly requested." })] }) }));
}
function PersonReferenceManager({ state, layoutMode, loading, running, onUpdateReference, onAddCustomReference, onRemoveReference }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "PersonReferenceManager", subtitle: "Select bride, groom, family, or custom reference images. No face processing is performed in Phase 4.", style: { ...AutoReelUi_1.glassCardStyle, flex: "1 1 100%", minWidth: 0 }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [state.references.map((reference) => ((0, jsx_runtime_1.jsxs)("div", { style: (0, AutoReelUi_1.referenceCardStyle)(layoutMode === "wide"), children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.md, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.xs, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: "#4A1621", fontWeight: 700 }, children: reference.label }), (0, jsx_runtime_1.jsxs)("div", { style: AutoReelUi_1.helperTextStyle, children: [(0, AutoReelUi_1.titleCase)(reference.role), " reference"] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.uploadLabelStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: reference.fileName || "Select image" }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", style: { display: "none" }, onChange: (event) => {
                                                            const file = event.target.files?.[0];
                                                            onUpdateReference(reference.id, {
                                                                fileName: file?.name ?? "",
                                                                previewUrl: file ? URL.createObjectURL(file) : undefined
                                                            });
                                                        }, disabled: loading || running })] }), reference.role === "custom" && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onRemoveReference(reference.id), disabled: loading || running, children: "Remove" }))] })] }), reference.previewUrl ? ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.sm, display: "flex", gap: theme_1.spacing.md, alignItems: "center", flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)("img", { src: reference.previewUrl, alt: `${reference.label} preview`, style: AutoReelUi_1.previewImageStyle }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onUpdateReference(reference.id, { fileName: "", previewUrl: undefined }), disabled: loading || running, children: "Clear" })] })) : null] }, reference.id))), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onAddCustomReference, disabled: loading || running, children: "Add Family / Custom Person" }) })] }) }) }));
}
function ReferenceReelInput({ state, fieldBasis, loading, running, error, onPatchState }) {
    const status = !state.referenceReelUrl.trim() && !state.referenceReelLocalFileName.trim()
        ? "idle"
        : !state.referenceReelUrl.trim() || (0, autoReelSetupConfig_1.isReferenceUrl)(state.referenceReelUrl)
            ? "valid"
            : "invalid";
    return ((0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "ReferenceReelInput", subtitle: "Attach a reference reel URL or local file. Both remain reference-only in Phase 4.", style: { ...AutoReelUi_1.glassCardStyle, flex: "1 1 100%", minWidth: 0 }, children: (0, jsx_runtime_1.jsxs)("div", { style: AutoReelUi_1.formRowStyle, children: [(0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Instagram / YouTube URL", flex: fieldBasis, error: error, children: (0, jsx_runtime_1.jsx)(primitives_1.Input, { value: state.referenceReelUrl, onChange: (event) => onPatchState({ referenceReelUrl: event.target.value }), placeholder: "https://instagram.com/reel/... or https://youtube.com/shorts/...", disabled: loading || running }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Authorized local reference file", flex: fieldBasis, children: (0, jsx_runtime_1.jsxs)("label", { style: AutoReelUi_1.uploadLabelStyle, children: [(0, jsx_runtime_1.jsx)("span", { children: state.referenceReelLocalFileName || "Choose local reference reel" }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "video/*", style: { display: "none" }, onChange: (event) => onPatchState({ referenceReelLocalFileName: event.target.files?.[0]?.name ?? "" }), disabled: loading || running })] }) }), (0, jsx_runtime_1.jsx)(AutoReelUi_1.Field, { label: "Validation state", flex: fieldBasis, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: status, tone: status === "valid" ? "success" : status === "invalid" ? "danger" : "neutral" }), (0, jsx_runtime_1.jsx)("span", { style: AutoReelUi_1.helperTextStyle, children: "Reference-only. No media download or style cloning happens in Phase 4." })] }) })] }) }) }));
}
function AutoReelPlanningPanel({ planningText, phases, error }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Planning Visibility", subtitle: "Readable request summary and structured setup phases. No fake analysis results are shown here.", style: { ...AutoReelUi_1.glassCardStyle, flex: "1 1 100%", minWidth: 0 }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.planningTextPanelStyle, children: planningText }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: phases.map((phase) => ((0, jsx_runtime_1.jsxs)("div", { style: AutoReelUi_1.phaseRowStyle, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: "#4A1621", fontWeight: 700 }, children: phase.title }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: phase.status, tone: phase.tone })] }), (0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.helperTextStyle, children: phase.detail })] }, phase.title))) }), error ? (0, jsx_runtime_1.jsx)("div", { style: { color: "#A23A35" }, children: error }) : null] }) }) }));
}
function AutoReelRequestPreview({ job, panelWidth, requestPreview, log }) {
    const progressPercent = !job || job.progress.total <= 0 ? 0 : Math.round((job.progress.current / job.progress.total) * 100);
    const extraction = job?.extraction;
    const currentClip = extraction?.progress.currentClipName || extraction?.progress.currentClipId || "None";
    const remainingClips = extraction?.progress.remainingClips ?? 0;
    return ((0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.sectionWrapStyle, children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Progress Panel", subtitle: "Real extraction progress, live log, warnings, and serialized AutoReelRequest preview.", style: { ...AutoReelUi_1.glassCardStyle, flex: "1 1 100%", minWidth: 0 }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.xs }, children: [(0, jsx_runtime_1.jsx)("div", { style: AutoReelUi_1.helperTextStyle, children: job?.progress.message || "Setup has not started yet." }), (0, jsx_runtime_1.jsx)("div", { style: { height: 10, borderRadius: 999, overflow: "hidden", background: "#EFE4D2" }, children: (0, jsx_runtime_1.jsx)("div", { style: { width: `${progressPercent}%`, height: "100%", background: "linear-gradient(90deg, #B28A4A, #6C2230)" } }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: job ? `${job.progress.current}/${job.progress.total} steps` : "0/0 steps", tone: job ? "success" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: job?.state || "idle", tone: job ? "warning" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Current clip ${currentClip}`, tone: extraction?.progress.currentClipName ? "warning" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: extraction ? `${extraction.progress.completedClips}/${Math.max(1, extraction.progress.totalClips)} clips complete` : "0/0 clips", tone: extraction ? "success" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: extraction ? `${remainingClips} clips remaining` : "0 remaining", tone: "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: extraction ? `${extraction.progress.cacheHits} cache hits` : "0 cache hits", tone: extraction?.progress.cacheHits ? "success" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: extraction ? `${extraction.progress.cacheMisses} cache misses` : "0 cache misses", tone: extraction?.progress.cacheMisses ? "warning" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: extraction?.sidecar.status === "available" ? "Sidecar available" : "Sidecar unavailable", tone: extraction?.sidecar.status === "available" ? "success" : "danger" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Panel width ${panelWidth}px`, tone: "neutral" })] }), job?.warnings.length ? ((0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Warnings / Errors", subtitle: "Truthful extraction blockers and fallback reasons.", style: AutoReelUi_1.nestedCardStyle, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [job.warnings.slice(0, 8).map((entry, index) => ((0, jsx_runtime_1.jsx)("div", { style: (0, AutoReelUi_1.logEntryStyle)(index !== Math.min(job.warnings.length, 8) - 1), children: entry }, `${index}-${entry}`))), job.warnings.length > 8 ? (0, jsx_runtime_1.jsxs)("div", { style: AutoReelUi_1.helperTextStyle, children: [job.warnings.length - 8, " more warnings are retained in the job state."] }) : null] }) })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.md, flexWrap: "wrap", alignItems: "stretch" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Live Planning Log", subtitle: "Readable progress and fallback notes only.", style: { ...AutoReelUi_1.nestedCardStyle, flex: "1 1 22rem", minWidth: 0 }, children: (0, jsx_runtime_1.jsx)(primitives_1.ScrollArea, { style: { minWidth: 0 }, children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: log.map((entry, index) => ((0, jsx_runtime_1.jsx)("div", { style: (0, AutoReelUi_1.logEntryStyle)(index !== log.length - 1), children: entry }, `${index}-${entry}`))) }) }) }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Serialized AutoReelRequest", subtitle: "Phase 4 request preview before later AI analysis phases.", style: { ...AutoReelUi_1.nestedCardStyle, flex: "1 1 22rem", minWidth: 0 }, children: (0, jsx_runtime_1.jsx)(primitives_1.ScrollArea, { style: { minWidth: 0 }, children: (0, jsx_runtime_1.jsx)("pre", { style: AutoReelUi_1.codeBlockStyle, children: requestPreview }) }) })] })] }) }) }));
}


/***/ },

/***/ 2390
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.kT = exports.logEntryStyle = exports.referenceCardStyle = exports.codeBlockStyle = exports.phaseRowStyle = exports.planningTextPanelStyle = exports.previewImageStyle = exports.uploadLabelStyle = exports.nestedCardStyle = exports.glassCardStyle = exports.helperTextStyle = exports.checkboxRowStyle = exports.fieldStyle = exports.formRowStyle = exports.sectionWrapStyle = void 0;
exports.Field = Field;
exports.SelectionGrid = SelectionGrid;
exports.SelectableChip = SelectableChip;
exports.titleCase = titleCase;
const jsx_runtime_1 = __webpack_require__(4848);
const theme_1 = __webpack_require__(3877);
function Field({ label, children, flex, error }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.xs, flex: flex ?? "1 1 100%", minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)("label", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700, fontSize: theme_1.typography.sizes.sm }, children: label }), children, error ? (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.danger, fontSize: theme_1.typography.sizes.xs }, children: error }) : null] }));
}
function SelectionGrid({ children }) {
    return (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.sm, minWidth: 0 }, children: children });
}
function SelectableChip({ active, label, onClick }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, style: (0, exports.kT)(active), children: label }));
}
function titleCase(value) {
    return value.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
exports.sectionWrapStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: theme_1.spacing.lg,
    alignItems: "stretch",
    minWidth: 0
};
exports.formRowStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: theme_1.spacing.md,
    minWidth: 0
};
exports.fieldStyle = {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    borderRadius: 10,
    border: `1px solid ${theme_1.colors.border}`,
    background: "rgba(255,255,255,0.78)",
    color: theme_1.colors.ink,
    padding: `${theme_1.spacing.sm}px ${theme_1.spacing.md}px`,
    fontSize: theme_1.typography.sizes.sm,
    backdropFilter: "blur(8px)"
};
exports.checkboxRowStyle = {
    display: "flex",
    gap: theme_1.spacing.sm,
    alignItems: "center",
    color: theme_1.colors.ink,
    lineHeight: 1.5
};
exports.helperTextStyle = {
    color: theme_1.colors.inkMuted,
    fontSize: theme_1.typography.sizes.xs,
    lineHeight: 1.5
};
exports.glassCardStyle = {
    background: "linear-gradient(180deg, rgba(255,249,242,0.92), rgba(255,249,242,0.84))",
    boxShadow: theme_1.shadows.raised,
    backdropFilter: "blur(14px)",
    transition: "box-shadow 160ms ease, transform 160ms ease"
};
exports.nestedCardStyle = {
    background: "rgba(255,255,255,0.64)",
    boxShadow: `0 10px 24px ${theme_1.colors.shadow}`,
    backdropFilter: "blur(12px)"
};
exports.uploadLabelStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    borderRadius: 10,
    border: `1px solid ${theme_1.colors.border}`,
    background: "rgba(255,255,255,0.78)",
    color: theme_1.colors.ink,
    padding: `${theme_1.spacing.sm}px ${theme_1.spacing.md}px`,
    cursor: "pointer",
    backdropFilter: "blur(8px)"
};
exports.previewImageStyle = {
    width: "100%",
    maxWidth: 140,
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: 10,
    border: `1px solid ${theme_1.colors.border}`,
    boxShadow: `0 10px 18px ${theme_1.colors.shadow}`
};
exports.planningTextPanelStyle = {
    padding: theme_1.spacing.md,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(239,228,210,0.58), rgba(255,255,255,0.72))",
    color: theme_1.colors.ink,
    lineHeight: 1.7,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7), 0 12px 24px ${theme_1.colors.shadow}`
};
exports.phaseRowStyle = {
    display: "flex",
    flexDirection: "column",
    gap: theme_1.spacing.xs,
    padding: theme_1.spacing.md,
    borderRadius: 12,
    background: "rgba(255,255,255,0.64)",
    boxShadow: `0 8px 18px ${theme_1.colors.shadow}`
};
exports.codeBlockStyle = {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontSize: theme_1.typography.sizes.xs,
    lineHeight: 1.5,
    color: theme_1.colors.ink
};
const referenceCardStyle = (wide) => ({
    padding: theme_1.spacing.md,
    borderRadius: 12,
    background: "rgba(255,255,255,0.58)",
    boxShadow: `0 8px 18px ${theme_1.colors.shadow}`,
    minWidth: 0,
    transition: "transform 160ms ease, box-shadow 160ms ease",
    transform: wide ? "translateY(0)" : "none"
});
exports.referenceCardStyle = referenceCardStyle;
const logEntryStyle = (withDivider) => ({
    paddingBottom: theme_1.spacing.sm,
    borderBottom: withDivider ? `1px solid ${theme_1.colors.cream}` : "none",
    color: theme_1.colors.ink,
    lineHeight: 1.6
});
exports.logEntryStyle = logEntryStyle;
const selectableChipStyle = (active) => ({
    borderRadius: 999,
    border: `1px solid ${active ? theme_1.colors.maroon : theme_1.colors.border}`,
    background: active ? theme_1.colors.maroon : "rgba(255,255,255,0.7)",
    color: active ? theme_1.colors.white : theme_1.colors.ink,
    padding: `${theme_1.spacing.xs}px ${theme_1.spacing.md}px`,
    cursor: "pointer",
    transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease",
    boxShadow: active ? `0 8px 18px ${theme_1.colors.shadow}` : "none",
    minWidth: 0,
    textAlign: "left"
});
exports.kT = selectableChipStyle;


/***/ },

/***/ 578
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
exports.runAutoReelExtractionStage = runAutoReelExtractionStage;
__webpack_unused_export__ = buildAutoReelExtractionRequest;
exports.buildExtractionProgressMessage = buildExtractionProgressMessage;
exports.isAutoReelExtractionCancelledError = isAutoReelExtractionCancelledError;
const autoReelSidecarClient_1 = __webpack_require__(7950);
const autoReelExtractionUtils_1 = __webpack_require__(6988);
const EXTRACTION_VERSION = "phase-4-extraction-v1";
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7;
const CACHE_MAX_BYTES = 1024 * 1024 * 1024;
const EXTRACTION_CONCURRENCY = 2;
const EXTRACTION_RETRY_LIMIT = 2;
class AutoReelExtractionCancelledError extends Error {
    constructor(message = "Auto Reel extraction was cancelled.") {
        super(message);
        this.name = "AutoReelExtractionCancelledError";
    }
}
__webpack_unused_export__ = AutoReelExtractionCancelledError;
async function runAutoReelExtractionStage(args) {
    const preflight = buildAutoReelExtractionRequest({
        job: args.job,
        request: args.request,
        clips: args.clips,
        context: args.context
    });
    const client = args.client ?? new autoReelSidecarClient_1.AutoReelSidecarClient();
    if (preflight.request.frameTasks.length === 0 && preflight.request.audioTasks.length === 0) {
        const fallback = buildImmediateExtractionResult(preflight, args.job, args.request, "completed", "No eligible verified local media paths were available for extraction.");
        args.onProgress?.(fallback);
        return toStageResult(fallback);
    }
    try {
        const result = await client.runExtractionJob(preflight.request, {
            signal: args.signal,
            onProgress: (payload) => args.onProgress?.(mergeExtractionResult(preflight, payload))
        });
        return toStageResult(mergeExtractionResult(preflight, result));
    }
    catch (error) {
        if (error instanceof autoReelSidecarClient_1.AutoReelSidecarCancelledError || args.signal?.aborted) {
            throw new AutoReelExtractionCancelledError();
        }
        if (error instanceof autoReelSidecarClient_1.AutoReelSidecarUnavailableError) {
            const fallback = buildImmediateExtractionResult(preflight, args.job, args.request, "sidecar-unavailable", error.message);
            args.onProgress?.(fallback);
            return toStageResult(fallback);
        }
        throw error;
    }
}
function buildAutoReelExtractionRequest(args) {
    const approvedRoots = new Set();
    const frameTasks = [];
    const audioTasks = [];
    const preflightFrameSamples = [];
    const preflightAudioExtractions = [];
    const preflightFailures = [];
    const preflightClipResults = [];
    const warnings = [];
    for (const clip of args.clips) {
        if (clip.mediaType !== "video") {
            preflightClipResults.push({
                clipId: clip.id,
                clipName: clip.name,
                frameSampleIds: [],
                status: "unavailable",
                cacheHits: 0,
                cacheMisses: 0,
                attempts: 0,
                error: `Clip "${clip.name}" is ${clip.mediaType} media and is not eligible for frame extraction.`
            });
            continue;
        }
        const baseSamples = (0, autoReelExtractionUtils_1.buildFrameSamplePlan)(clip);
        if (!clip.mediaPath) {
            const message = `Clip "${clip.name}" does not expose a verified source media path in this host session.`;
            warnings.push(message);
            preflightFrameSamples.push(...baseSamples.map((sample) => unavailableFrameSample(sample, message)));
            preflightFailures.push({
                taskId: `frames:${clip.id}`,
                clipId: clip.id,
                targetKind: "frames",
                status: "unavailable",
                message,
                attempts: 0,
                recordedAt: new Date().toISOString()
            });
            preflightClipResults.push({
                clipId: clip.id,
                clipName: clip.name,
                frameSampleIds: baseSamples.map((sample) => sample.id),
                status: "unavailable",
                cacheHits: 0,
                cacheMisses: 0,
                attempts: 0,
                error: message
            });
            continue;
        }
        if (typeof clip.sourceInSeconds !== "number" || typeof clip.sourceOutSeconds !== "number") {
            const message = `Clip "${clip.name}" is missing verified source in/out timing for extraction.`;
            warnings.push(message);
            preflightFrameSamples.push(...baseSamples.map((sample) => unavailableFrameSample(sample, message)));
            preflightFailures.push({
                taskId: `frames:${clip.id}`,
                clipId: clip.id,
                targetKind: "frames",
                status: "unavailable",
                message,
                attempts: 0,
                recordedAt: new Date().toISOString()
            });
            preflightClipResults.push({
                clipId: clip.id,
                clipName: clip.name,
                frameSampleIds: baseSamples.map((sample) => sample.id),
                status: "unavailable",
                cacheHits: 0,
                cacheMisses: 0,
                attempts: 0,
                error: message
            });
            continue;
        }
        approvedRoots.add(directoryOfPath(clip.mediaPath));
        frameTasks.push({
            clipId: clip.id,
            clipName: clip.name,
            mediaPath: clip.mediaPath,
            mediaFingerprint: clip.mediaFingerprint,
            cacheKey: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                category: "clip-frames",
                mediaFingerprint: clip.mediaFingerprint,
                version: EXTRACTION_VERSION,
                parameters: {
                    clipId: clip.id,
                    sourceInSeconds: clip.sourceInSeconds,
                    sourceOutSeconds: clip.sourceOutSeconds,
                    samplePlan: baseSamples.map((sample) => ({
                        sourceTimeSeconds: sample.sourceTimeSeconds,
                        sampleKind: sample.sampleKind
                    }))
                }
            }),
            sourceInSeconds: clip.sourceInSeconds,
            sourceOutSeconds: clip.sourceOutSeconds,
            samplePlan: baseSamples.map((sample) => ({
                id: sample.id,
                sourceTimeSeconds: sample.sourceTimeSeconds,
                sampleKind: sample.sampleKind
            }))
        });
    }
    const selectedSong = resolveSelectedSongAudioTask(args.request, args.context);
    if (selectedSong) {
        if (selectedSong.mediaPath) {
            approvedRoots.add(directoryOfPath(selectedSong.mediaPath));
            audioTasks.push(selectedSong);
        }
        else {
            preflightAudioExtractions.push(unavailableAudioExtraction(selectedSong, selectedSong.label));
        }
    }
    if (args.request.setup?.musicSource.extractClipAudio) {
        for (const frameTask of frameTasks) {
            audioTasks.push({
                id: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                    category: "clip-audio",
                    mediaFingerprint: frameTask.mediaFingerprint,
                    version: EXTRACTION_VERSION,
                    parameters: { clipId: frameTask.clipId, sourceKind: "clip-audio" }
                }),
                sourceKind: "clip-audio",
                clipId: frameTask.clipId,
                label: `${frameTask.clipName} audio`,
                mediaPath: frameTask.mediaPath,
                mediaFingerprint: frameTask.mediaFingerprint,
                cacheKey: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                    category: "audio-proxy",
                    mediaFingerprint: frameTask.mediaFingerprint,
                    version: EXTRACTION_VERSION,
                    parameters: { clipId: frameTask.clipId, sourceKind: "clip-audio" }
                })
            });
        }
    }
    return {
        request: {
            schemaVersion: 1,
            jobId: args.job.id,
            requestId: args.request.id,
            requestedAt: new Date().toISOString(),
            approvedRoots: Array.from(approvedRoots).filter((value) => value.length > 0).sort(),
            frameTasks,
            audioTasks,
            cache: {
                rootName: "rkflow-cache",
                extractorVersion: EXTRACTION_VERSION,
                ttlSeconds: CACHE_TTL_SECONDS,
                maxBytes: CACHE_MAX_BYTES
            },
            limits: {
                concurrency: EXTRACTION_CONCURRENCY,
                retryLimit: EXTRACTION_RETRY_LIMIT
            }
        },
        preflightFrameSamples,
        preflightAudioExtractions,
        preflightFailures,
        preflightClipResults,
        warnings
    };
}
function buildExtractionProgressMessage(result) {
    const clipLabel = result.progress.currentClipName ? ` ${result.progress.currentClipName}` : "";
    const clipProgress = `${result.progress.completedClips}/${Math.max(1, result.progress.totalClips)} clips`;
    const audioProgress = `${result.progress.completedAudioTasks}/${Math.max(1, result.progress.totalAudioTasks)} audio`;
    return `Extracting${clipLabel}. ${clipProgress}, ${audioProgress}, cache ${result.progress.cacheHits} hit / ${result.progress.cacheMisses} miss.`;
}
function isAutoReelExtractionCancelledError(error) {
    return error instanceof AutoReelExtractionCancelledError;
}
function mergeExtractionResult(preflight, result) {
    return {
        ...result,
        clipResults: [...preflight.preflightClipResults, ...result.clipResults],
        frameSamples: [...preflight.preflightFrameSamples, ...result.frameSamples],
        audioExtractions: [...preflight.preflightAudioExtractions, ...result.audioExtractions],
        failures: [...preflight.preflightFailures, ...result.failures],
        warnings: [...preflight.warnings, ...result.warnings]
    };
}
function buildImmediateExtractionResult(preflight, job, request, status, reason) {
    const frameSamples = [
        ...preflight.preflightFrameSamples,
        ...preflight.request.frameTasks.flatMap((task) => task.samplePlan.map((sample) => unavailableFrameSample({
            ...sample,
            clipId: task.clipId
        }, reason, task.cacheKey)))
    ];
    const audioExtractions = [
        ...preflight.preflightAudioExtractions,
        ...preflight.request.audioTasks.map((task) => unavailableAudioExtraction(task, reason))
    ];
    const failures = [
        ...preflight.preflightFailures,
        ...preflight.request.frameTasks.map((task) => ({
            taskId: `frames:${task.clipId}`,
            clipId: task.clipId,
            targetKind: "frames",
            status: status === "cancelled" ? "cancelled" : "failed",
            message: reason,
            attempts: 0,
            recordedAt: new Date().toISOString()
        })),
        ...preflight.request.audioTasks.map((task) => ({
            taskId: task.id,
            clipId: task.clipId,
            audioTaskId: task.id,
            targetKind: "audio",
            status: status === "cancelled" ? "cancelled" : "failed",
            message: reason,
            attempts: 0,
            recordedAt: new Date().toISOString()
        }))
    ];
    return {
        schemaVersion: 1,
        jobId: job.id,
        requestId: request.id,
        status,
        sidecar: {
            status: "unavailable",
            reason
        },
        progress: {
            completedClips: preflight.request.frameTasks.length,
            remainingClips: 0,
            totalClips: preflight.request.frameTasks.length,
            completedAudioTasks: preflight.request.audioTasks.length,
            totalAudioTasks: preflight.request.audioTasks.length,
            cacheHits: 0,
            cacheMisses: preflight.request.frameTasks.length + preflight.request.audioTasks.length
        },
        clipResults: [
            ...preflight.preflightClipResults,
            ...preflight.request.frameTasks.map((task) => ({
                clipId: task.clipId,
                clipName: task.clipName,
                frameSampleIds: task.samplePlan.map((sample) => sample.id),
                status: "failed",
                cacheHits: 0,
                cacheMisses: task.samplePlan.length,
                attempts: 0,
                error: reason
            }))
        ],
        frameSamples,
        audioExtractions,
        failures,
        warnings: [...preflight.warnings, reason],
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
    };
}
function toStageResult(extraction) {
    return {
        extraction,
        frameSamples: extraction.frameSamples,
        audioExtractions: extraction.audioExtractions,
        failures: extraction.failures,
        warnings: extraction.warnings,
        planningText: extraction.status === "sidecar-unavailable"
            ? "Frame/audio extraction could not run because the local analysis sidecar is unavailable."
            : "Frame/audio extraction completed. Vision AI, Music AI, scoring, story building, and planning are still not started."
    };
}
function unavailableFrameSample(sample, reason, cacheKey) {
    return {
        id: sample.id,
        clipId: sample.clipId,
        sourceTimeSeconds: sample.sourceTimeSeconds,
        sampleKind: sample.sampleKind,
        cacheKey,
        cacheStatus: "unavailable",
        extractionStatus: "unavailable",
        capabilityReason: reason,
        error: reason,
        capturedAt: new Date().toISOString()
    };
}
function unavailableAudioExtraction(task, reason) {
    return {
        id: task.id,
        taskId: task.id,
        sourceKind: task.sourceKind,
        clipId: task.clipId,
        cacheKey: task.cacheKey,
        cacheStatus: "unavailable",
        extractionStatus: "unavailable",
        waveform: [],
        extractedAt: new Date().toISOString(),
        capabilityReason: reason,
        error: reason
    };
}
function resolveSelectedSongAudioTask(request, context) {
    const musicSource = request.setup?.musicSource;
    if (!musicSource || musicSource.mode === "none") {
        return null;
    }
    if (musicSource.mode === "local-file") {
        if (!musicSource.filePath) {
            return {
                id: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                    category: "selected-song",
                    mediaFingerprint: request.mediaSelection.mediaFingerprint,
                    version: EXTRACTION_VERSION,
                    parameters: { requestId: request.id, mode: musicSource.mode }
                }),
                sourceKind: "selected-song",
                label: "Selected song is missing a verified local filesystem path.",
                mediaPath: "",
                mediaFingerprint: request.mediaSelection.mediaFingerprint,
                cacheKey: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                    category: "audio-proxy",
                    mediaFingerprint: request.mediaSelection.mediaFingerprint,
                    version: EXTRACTION_VERSION,
                    parameters: { requestId: request.id, mode: musicSource.mode }
                })
            };
        }
        return {
            id: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                category: "selected-song",
                mediaFingerprint: request.mediaSelection.mediaFingerprint,
                version: EXTRACTION_VERSION,
                parameters: { requestId: request.id, mode: musicSource.mode, filePath: musicSource.filePath }
            }),
            sourceKind: "selected-song",
            label: musicSource.fileName || "Selected song",
            mediaPath: musicSource.filePath,
            mediaFingerprint: request.mediaSelection.mediaFingerprint,
            cacheKey: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                category: "audio-proxy",
                mediaFingerprint: request.mediaSelection.mediaFingerprint,
                version: EXTRACTION_VERSION,
                parameters: { requestId: request.id, sourcePath: musicSource.filePath }
            })
        };
    }
    if (musicSource.mode === "project-item") {
        const projectItem = context.projectItemOptions.find((item) => item.id === musicSource.projectItemId);
        const mediaPath = projectItem?.mediaPath || "";
        return {
            id: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                category: "selected-song",
                mediaFingerprint: request.mediaSelection.mediaFingerprint,
                version: EXTRACTION_VERSION,
                parameters: { requestId: request.id, mode: musicSource.mode, projectItemId: musicSource.projectItemId }
            }),
            sourceKind: "selected-song",
            label: projectItem?.label || "Selected song project item",
            mediaPath,
            mediaFingerprint: request.mediaSelection.mediaFingerprint,
            cacheKey: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
                category: "audio-proxy",
                mediaFingerprint: request.mediaSelection.mediaFingerprint,
                version: EXTRACTION_VERSION,
                parameters: { requestId: request.id, projectItemId: musicSource.projectItemId }
            })
        };
    }
    return {
        id: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
            category: "selected-song",
            mediaFingerprint: request.mediaSelection.mediaFingerprint,
            version: EXTRACTION_VERSION,
            parameters: { requestId: request.id, mode: musicSource.mode }
        }),
        sourceKind: "selected-song",
        label: musicSource.mode === "social-reference"
            ? "Social reference links are metadata-only and are not downloaded for extraction."
            : "Direct URLs are not extracted by the local-only sidecar. Use a local file or Premiere project item.",
        mediaPath: "",
        mediaFingerprint: request.mediaSelection.mediaFingerprint,
        cacheKey: (0, autoReelExtractionUtils_1.buildExtractionCacheKey)({
            category: "audio-proxy",
            mediaFingerprint: request.mediaSelection.mediaFingerprint,
            version: EXTRACTION_VERSION,
            parameters: { requestId: request.id, mode: musicSource.mode }
        })
    };
}
function directoryOfPath(value) {
    const normalized = value.replaceAll("\\", "/");
    const index = normalized.lastIndexOf("/");
    return index <= 0 ? normalized : normalized.slice(0, index);
}


/***/ },

/***/ 6988
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.hashStableText = hashStableText;
exports.buildExtractionCacheKey = buildExtractionCacheKey;
exports.buildFrameSamplePlan = buildFrameSamplePlan;
function hashStableText(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
        hash ^= value.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return `rk${(hash >>> 0).toString(16)}`;
}
function buildExtractionCacheKey(input) {
    return hashStableText([
        input.category,
        input.mediaFingerprint,
        input.version,
        stableSerialize(input.parameters)
    ].join("::"));
}
function buildFrameSamplePlan(clip, adaptiveHookSeconds = []) {
    const rangeStart = typeof clip.sourceInSeconds === "number" ? clip.sourceInSeconds : 0;
    const rangeEndCandidate = typeof clip.sourceOutSeconds === "number" ? clip.sourceOutSeconds : rangeStart;
    const rangeEnd = rangeEndCandidate >= rangeStart ? rangeEndCandidate : rangeStart;
    const middle = rangeStart + (rangeEnd - rangeStart) / 2;
    const baseSamples = [
        createPlannedFrameSample(clip.id, clip.cacheKey, "start", rangeStart),
        createPlannedFrameSample(clip.id, clip.cacheKey, "middle", middle),
        createPlannedFrameSample(clip.id, clip.cacheKey, "end", rangeEnd)
    ];
    const adaptiveSamples = adaptiveHookSeconds
        .filter((value) => Number.isFinite(value))
        .map((value) => clampNumber(value, rangeStart, rangeEnd))
        .filter((value, index, values) => values.indexOf(value) === index)
        .sort((left, right) => left - right)
        .map((value) => createPlannedFrameSample(clip.id, clip.cacheKey, "custom", value));
    return [...baseSamples, ...adaptiveSamples];
}
function createPlannedFrameSample(clipId, clipCacheKey, sampleKind, sourceTimeSeconds) {
    const normalizedTime = Number(sourceTimeSeconds.toFixed(3));
    return {
        id: buildExtractionCacheKey({
            category: "frame-sample",
            mediaFingerprint: clipCacheKey,
            version: "phase-4-frame-sample-v1",
            parameters: {
                clipId,
                sampleKind,
                sourceTimeSeconds: normalizedTime
            }
        }),
        clipId,
        sampleKind,
        sourceTimeSeconds: normalizedTime
    };
}
function clampNumber(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
}
function stableSerialize(value) {
    if (Array.isArray(value)) {
        return `[${value.map((item) => stableSerialize(item)).join(",")}]`;
    }
    if (value && typeof value === "object") {
        return `{${Object.keys(value)
            .sort()
            .map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`)
            .join(",")}}`;
    }
    return JSON.stringify(value);
}


/***/ },

/***/ 9652
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
exports.scanAutoReelTimeline = scanAutoReelTimeline;
exports.isAutoReelScanCancelledError = isAutoReelScanCancelledError;
const autoReelExtractionUtils_1 = __webpack_require__(6988);
class AutoReelScanCancelledError extends Error {
    constructor(message = "Auto Reel scan cancelled.") {
        super(message);
        this.name = "AutoReelScanCancelledError";
    }
}
__webpack_unused_export__ = AutoReelScanCancelledError;
const SCAN_CACHE_VERSION = "phase-3-scan-v1";
async function scanAutoReelTimeline(input) {
    throwIfCancelled(input.signal);
    const timelineCandidates = flattenTimelineCandidates(input.timeline);
    const sourceCandidates = resolveSourceCandidates(timelineCandidates, input.state, input.projectItemOptions, input.timeline);
    const sortedCandidates = sortCandidates(sourceCandidates);
    const exclusions = createExclusionCounts();
    const keptCandidates = [];
    input.onProgress?.({
        phase: "resolving-source",
        current: 0,
        total: Math.max(1, sortedCandidates.length),
        percent: sortedCandidates.length === 0 ? 100 : 0,
        message: buildResolveMessage(input.state.sourceMode, sortedCandidates.length),
        included: 0,
        excluded: 0
    });
    for (let index = 0; index < sortedCandidates.length; index += 1) {
        throwIfCancelled(input.signal);
        const candidate = sortedCandidates[index];
        const shouldInclude = shouldIncludeClip(candidate.clip, input.state, exclusions);
        if (shouldInclude) {
            keptCandidates.push(candidate);
        }
        input.onProgress?.({
            phase: "scanning-clips",
            current: index + 1,
            total: sortedCandidates.length,
            percent: Math.round(((index + 1) / Math.max(1, sortedCandidates.length)) * 100),
            message: `Scanning ${index + 1}/${sortedCandidates.length}: ${candidate.clip.name}`,
            clipName: candidate.clip.name,
            included: keptCandidates.length,
            excluded: exclusions.disabled +
                exclusions.audio +
                exclusions.still +
                exclusions.overMax +
                exclusions.sourceMismatch
        });
    }
    const limitedCandidates = keptCandidates.slice(0, Math.max(1, input.state.maximumClipCount));
    exclusions.overMax = Math.max(0, keptCandidates.length - limitedCandidates.length);
    const selectionCapabilityNotes = buildSelectionCapabilityNotes(input.timeline, input.state);
    const selectionFingerprint = (0, autoReelExtractionUtils_1.hashStableText)(limitedCandidates.map((candidate) => buildClipFingerprint(candidate.clip)).join("|"));
    const selectionCacheKey = (0, autoReelExtractionUtils_1.hashStableText)([
        SCAN_CACHE_VERSION,
        input.projectId,
        input.sequenceId,
        input.state.sourceMode,
        selectionFingerprint,
        String(input.state.includeDisabledClips),
        String(input.state.includeAudioOnlyItems),
        String(input.state.includeStillItems),
        String(input.state.minimumClipCount),
        String(input.state.maximumClipCount)
    ].join("::"));
    const descriptors = limitedCandidates.map((candidate) => toClipDescriptor(candidate, input.timeline, selectionCacheKey));
    const warnings = buildWarnings(input.state, exclusions, sortedCandidates.length, descriptors.length);
    const selection = {
        mode: input.state.sourceMode,
        projectId: input.projectId,
        sequenceId: input.sequenceId,
        sequenceName: input.sequenceName,
        clipIds: descriptors.map((descriptor) => descriptor.id),
        projectItemIds: descriptors
            .map((descriptor) => descriptor.projectItemId)
            .filter((value) => typeof value === "string" && value.length > 0),
        inPointSeconds: input.timeline.inPoint,
        outPointSeconds: input.timeline.outPoint,
        usedFallback: input.state.sourceMode === "project-items" && sortedCandidates.length === 0,
        sequenceResolution: input.timeline.frameSize,
        fps: input.timeline.fps || null,
        timebase: input.timeline.timebase,
        playheadSeconds: input.timeline.playhead,
        selectedClipCount: timelineCandidates.filter((candidate) => candidate.clip.selected).length,
        scannedClipCount: descriptors.length,
        mediaFingerprint: selectionFingerprint,
        cacheKey: selectionCacheKey,
        capabilityNotes: selectionCapabilityNotes
    };
    const log = buildLog(input.state.sourceMode, exclusions, sortedCandidates.length, descriptors.length, input.timeline);
    const planningText = buildPlanningText(input.state.sourceMode, descriptors.length, sortedCandidates.length, warnings, input.timeline);
    input.onProgress?.({
        phase: "complete",
        current: descriptors.length,
        total: descriptors.length,
        percent: 100,
        message: `Scanner captured ${descriptors.length} clip descriptors from ${describeSourceMode(input.state.sourceMode)}.`,
        included: descriptors.length,
        excluded: exclusions.disabled +
            exclusions.audio +
            exclusions.still +
            exclusions.overMax +
            exclusions.sourceMismatch
    });
    return {
        selection,
        descriptors,
        warnings,
        log,
        planningText
    };
}
function isAutoReelScanCancelledError(error) {
    return error instanceof AutoReelScanCancelledError;
}
function flattenTimelineCandidates(timeline) {
    return [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) => track.clips.map((clip) => ({ clip, trackType: track.type })));
}
function resolveSourceCandidates(candidates, state, projectItemOptions, timeline) {
    switch (state.sourceMode) {
        case "selected-clips":
            return candidates.filter((candidate) => candidate.clip.selected);
        case "in-out-range":
            return candidates.filter((candidate) => overlapsRange(candidate.clip, timeline.inPoint, timeline.outPoint));
        case "manual-selection":
            return candidates.filter((candidate) => state.manualClipIds.includes(candidate.clip.id));
        case "project-items":
            return resolveProjectItemCandidates(candidates, state.selectedProjectItemIds, projectItemOptions);
        default:
            return candidates;
    }
}
function resolveProjectItemCandidates(candidates, selectedIds, projectItemOptions) {
    const selected = projectItemOptions.filter((option) => selectedIds.includes(option.id));
    const matchedProjectItemIds = new Set();
    const matchedNodeIds = new Set();
    const matchedMediaPaths = new Set();
    for (const option of selected) {
        collectProjectItemTargets(option, projectItemOptions).forEach((target) => {
            if (target.projectItemId) {
                matchedProjectItemIds.add(target.projectItemId);
            }
            if (target.nodeId) {
                matchedNodeIds.add(target.nodeId);
            }
            if (target.mediaPath) {
                matchedMediaPaths.add(target.mediaPath);
            }
        });
    }
    return candidates.filter((candidate) => {
        const projectItemId = candidate.clip.projectItemId;
        const projectItemNodeId = candidate.clip.projectItemNodeId;
        const mediaPath = candidate.clip.mediaPath;
        return ((projectItemId !== null && matchedProjectItemIds.has(projectItemId)) ||
            (projectItemNodeId !== null && matchedNodeIds.has(projectItemNodeId)) ||
            (mediaPath !== null && matchedMediaPaths.has(mediaPath)));
    });
}
function collectProjectItemTargets(selected, projectItemOptions) {
    const descendants = projectItemOptions.filter((candidate) => candidate.ancestorIds?.includes(selected.id));
    return [selected, ...descendants];
}
function shouldIncludeClip(clip, state, exclusions) {
    if (!state.includeDisabledClips && clip.disabled === true) {
        exclusions.disabled += 1;
        return false;
    }
    if (!state.includeAudioOnlyItems && clip.mediaType === "audio") {
        exclusions.audio += 1;
        return false;
    }
    if (!state.includeStillItems && clip.mediaType === "still") {
        exclusions.still += 1;
        return false;
    }
    return true;
}
function overlapsRange(clip, inPoint, outPoint) {
    if (!(outPoint > inPoint)) {
        return true;
    }
    return clip.end >= inPoint && clip.start <= outPoint;
}
function sortCandidates(candidates) {
    return [...candidates].sort((left, right) => {
        if (left.clip.start !== right.clip.start) {
            return left.clip.start - right.clip.start;
        }
        if (left.clip.trackIndex !== right.clip.trackIndex) {
            return left.clip.trackIndex - right.clip.trackIndex;
        }
        if (left.trackType !== right.trackType) {
            return left.trackType === "video" ? -1 : 1;
        }
        return left.clip.name.localeCompare(right.clip.name);
    });
}
function toClipDescriptor(candidate, timeline, selectionCacheKey) {
    const capabilityNotes = candidate.clip.capabilityNotes.map(toCapabilityNote);
    if (candidate.clip.mediaPath === null) {
        capabilityNotes.push({
            field: "mediaPath",
            source: "unavailable",
            reason: "Media path remains null because the active host session did not expose getMediaFilePath() for this clip."
        });
    }
    if (candidate.clip.linkedClipIds === null) {
        capabilityNotes.push({
            field: "linkedClipIds",
            source: "unavailable",
            reason: "Linked audio/video relationship remains null because no verified relationship reader is exposed by the active Premiere runtime."
        });
    }
    if (candidate.clip.proxyState === null) {
        capabilityNotes.push({
            field: "proxyState",
            source: "unavailable",
            reason: "Proxy state remains null because no verified proxy-state reader is exposed by the active Premiere runtime."
        });
    }
    const mediaFingerprint = buildClipFingerprint(candidate.clip);
    const metadataStatus = deriveMetadataStatus(capabilityNotes);
    return {
        id: candidate.clip.id,
        projectItemId: candidate.clip.projectItemId,
        projectItemNodeId: candidate.clip.projectItemNodeId,
        name: candidate.clip.name,
        mediaType: candidate.clip.mediaType,
        mediaPath: candidate.clip.mediaPath,
        sourceInSeconds: candidate.clip.sourceIn,
        sourceOutSeconds: candidate.clip.sourceOut,
        timelineStartSeconds: candidate.clip.start,
        timelineEndSeconds: candidate.clip.end,
        trackIndex: candidate.clip.trackIndex,
        trackType: candidate.trackType,
        speed: candidate.clip.speed,
        disabled: candidate.clip.disabled,
        selected: candidate.clip.selected,
        linkedClipIds: candidate.clip.linkedClipIds,
        frameRate: timeline.fps || null,
        width: candidate.clip.sourceFrameSize?.width ?? null,
        height: candidate.clip.sourceFrameSize?.height ?? null,
        proxyState: candidate.clip.proxyState,
        lockedTrackState: null,
        mediaFingerprint,
        cacheKey: (0, autoReelExtractionUtils_1.hashStableText)(`${selectionCacheKey}::${mediaFingerprint}`),
        metadataStatus,
        capabilityNotes: [
            ...capabilityNotes,
            {
                field: "lockedTrackState",
                source: "unavailable",
                reason: "Track locked-state remains null because no verified reader is exposed by the active Premiere runtime."
            }
        ]
    };
}
function buildWarnings(state, exclusions, matchedCount, descriptorCount) {
    const warnings = [];
    if (descriptorCount < state.minimumClipCount) {
        warnings.push(`Scanner matched ${descriptorCount} clips after filtering, below the requested minimum of ${state.minimumClipCount}.`);
    }
    if (exclusions.disabled > 0) {
        warnings.push(`${exclusions.disabled} disabled clips were excluded by filter.`);
    }
    if (exclusions.audio > 0) {
        warnings.push(`${exclusions.audio} audio-only items were excluded by filter.`);
    }
    if (exclusions.still > 0) {
        warnings.push(`${exclusions.still} still items were excluded by filter.`);
    }
    if (exclusions.overMax > 0) {
        warnings.push(`${exclusions.overMax} clips were trimmed after scan because the maximum clip count is ${state.maximumClipCount}.`);
    }
    if (state.sourceMode === "project-items" && matchedCount === 0) {
        warnings.push("No timeline clips matched the selected project items/bin. This workspace does not expose verified live Project-panel selection APIs, so Auto Reel only resolves explicit item/bin picks from the readable project tree.");
    }
    return warnings;
}
function buildLog(mode, exclusions, matchedCount, descriptorCount, timeline) {
    const lines = [
        `Resolved ${matchedCount} source candidates from ${describeSourceMode(mode)}.`,
        `Captured ${descriptorCount} truthful clip descriptors from the active sequence.`,
        `Sequence metadata: ${describeFrameSize(timeline.frameSize)} at ${timeline.fps || 0} fps${timeline.timebase !== null ? ` / timebase ${timeline.timebase}` : ""}.`,
        `Unavailable host reads remain null for linked audio/video relationships, proxy state, and locked-track state.`
    ];
    if (exclusions.disabled > 0) {
        lines.push(`Excluded disabled clips: ${exclusions.disabled}.`);
    }
    if (exclusions.audio > 0) {
        lines.push(`Excluded audio-only items: ${exclusions.audio}.`);
    }
    if (exclusions.still > 0) {
        lines.push(`Excluded still items: ${exclusions.still}.`);
    }
    if (exclusions.overMax > 0) {
        lines.push(`Trimmed after max clip-count filter: ${exclusions.overMax}.`);
    }
    return lines;
}
function buildPlanningText(mode, descriptorCount, matchedCount, warnings, timeline) {
    const summary = [
        `Scanner resolved ${matchedCount} source candidates from ${describeSourceMode(mode)} and kept ${descriptorCount} clip descriptors.`,
        `Sequence ${timeline.sequenceName || "Active Sequence"} is ${describeFrameSize(timeline.frameSize)} at ${timeline.fps || 0} fps.`,
        `Playhead ${formatSeconds(timeline.playhead)}, In ${formatSeconds(timeline.inPoint)}, Out ${formatSeconds(timeline.outPoint)}.`
    ];
    if (warnings.length > 0) {
        summary.push(`Warnings: ${warnings.join(" ")}`);
    }
    else {
        summary.push("No frame extraction, scoring, planning, or Premiere execution has run in this phase.");
    }
    return summary.join(" ");
}
function buildSelectionCapabilityNotes(timeline, state) {
    const notes = timeline.capabilityNotes.map(toCapabilityNote);
    notes.push({
        field: "lockedTrackFilter",
        source: "unavailable",
        reason: state.includeLockedTracks
            ? "Locked-track inclusion was requested, but the active Premiere runtime does not expose a verified locked-track state reader."
            : "Locked-track exclusion remains unavailable because the active Premiere runtime does not expose a verified locked-track state reader."
    });
    return notes;
}
function buildClipFingerprint(clip) {
    return (0, autoReelExtractionUtils_1.hashStableText)([
        clip.projectItemId ?? "project-item:unknown",
        clip.projectItemNodeId ?? "node:unknown",
        clip.mediaPath ?? "path:unknown",
        clip.name,
        formatStableNumber(clip.start),
        formatStableNumber(clip.end),
        formatStableNumber(clip.sourceIn),
        formatStableNumber(clip.sourceOut),
        clip.mediaType
    ].join("::"));
}
function deriveMetadataStatus(notes) {
    if (notes.some((note) => note.source === "metadata-fallback")) {
        return "metadata-fallback";
    }
    if (notes.some((note) => note.source === "unavailable")) {
        return "unavailable";
    }
    return "host-verified";
}
function buildResolveMessage(mode, count) {
    return `Resolved ${count} source candidates from ${describeSourceMode(mode)}.`;
}
function describeSourceMode(mode) {
    return mode.replaceAll("-", " ");
}
function describeFrameSize(frameSize) {
    if (!frameSize) {
        return "unknown resolution";
    }
    return `${frameSize.width}x${frameSize.height}`;
}
function formatSeconds(totalSeconds) {
    const safe = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}
function toCapabilityNote(note) {
    return { field: note.field, source: note.source, reason: note.reason };
}
function createExclusionCounts() {
    return {
        disabled: 0,
        audio: 0,
        still: 0,
        overMax: 0,
        sourceMismatch: 0
    };
}
function throwIfCancelled(signal) {
    if (signal?.aborted) {
        throw new AutoReelScanCancelledError();
    }
}
function formatStableNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value.toFixed(3) : "unknown";
}


/***/ },

/***/ 8489
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDefaultAutoReelSetupState = createDefaultAutoReelSetupState;
exports.buildSetupConfig = buildSetupConfig;
exports.validateAutoReelSetupState = validateAutoReelSetupState;
exports.serializeAutoReelSetupIntoRequest = serializeAutoReelSetupIntoRequest;
exports.getAutoReelLayoutMode = getAutoReelLayoutMode;
exports.getAutoReelEffectiveWidth = getAutoReelEffectiveWidth;
exports.fieldFlex = fieldFlex;
exports.isReferenceUrl = isReferenceUrl;
exports.isDirectMediaUrl = isDirectMediaUrl;
exports.isSocialReferenceUrl = isSocialReferenceUrl;
const validation_1 = __webpack_require__(3492);
function createDefaultAutoReelSetupState(overrides = {}) {
    return {
        sourceMode: "selected-clips",
        includeLockedTracks: false,
        includeDisabledClips: false,
        includeAudioOnlyItems: false,
        includeStillItems: false,
        minimumClipCount: 8,
        maximumClipCount: 60,
        reelType: "wedding-highlight",
        targetDurationSeconds: 60,
        aspectRatio: "9:16",
        style: "signature",
        storyMode: "story",
        emotionPriority: "balanced",
        balanceTarget: "balanced",
        energy: "balanced",
        cutDensity: "balanced",
        transitionIntensity: "balanced",
        motionIntensity: "balanced",
        sfxIntensity: "low",
        colorIntensity: "balanced",
        outputSequenceName: "Auto Reel",
        createNewSequence: true,
        selectedProjectItemIds: [],
        manualClipIds: [],
        musicSourceMode: "none",
        musicLocalFileName: "",
        musicLocalFilePath: "",
        musicProjectItemId: "",
        musicDirectUrl: "",
        musicSocialReferenceUrl: "",
        cachedMusicId: "",
        extractClipAudio: false,
        copyrightNoticeAccepted: false,
        references: [
            { id: "bride-reference", role: "bride", label: "Bride" },
            { id: "groom-reference", role: "groom", label: "Groom" }
        ],
        referenceReelUrl: "",
        referenceReelLocalFileName: "",
        ...overrides
    };
}
function buildSetupConfig(state) {
    return {
        sourceMode: state.sourceMode,
        clipFilter: {
            includeLockedTracks: state.includeLockedTracks,
            includeDisabledClips: state.includeDisabledClips,
            includeAudioOnlyItems: state.includeAudioOnlyItems,
            includeStillItems: state.includeStillItems,
            minimumClipCount: state.minimumClipCount,
            maximumClipCount: state.maximumClipCount
        },
        aspectRatio: state.aspectRatio,
        reelType: state.reelType,
        style: state.style,
        storyMode: state.storyMode,
        emotionPriority: state.emotionPriority,
        balanceTarget: state.balanceTarget,
        energy: state.energy,
        cutDensity: state.cutDensity,
        transitionIntensity: state.transitionIntensity,
        motionIntensity: state.motionIntensity,
        sfxIntensity: state.sfxIntensity,
        colorIntensity: state.colorIntensity,
        outputSequenceName: state.outputSequenceName.trim(),
        createNewSequence: true,
        musicSource: {
            mode: state.musicSourceMode,
            fileName: state.musicLocalFileName || undefined,
            filePath: state.musicLocalFilePath || undefined,
            projectItemId: state.musicProjectItemId || undefined,
            directUrl: normalizeOptionalText(state.musicDirectUrl),
            socialReferenceUrl: normalizeOptionalText(state.musicSocialReferenceUrl),
            cachedMusicId: state.cachedMusicId || undefined,
            extractClipAudio: state.extractClipAudio,
            copyrightNoticeAccepted: state.copyrightNoticeAccepted
        },
        references: state.references.map((reference) => ({
            id: reference.id,
            role: reference.role,
            label: reference.label,
            fileName: reference.fileName
        })),
        referenceReel: state.referenceReelUrl.trim() || state.referenceReelLocalFileName.trim()
            ? {
                mode: state.referenceReelLocalFileName.trim() ? "local-file" : "url",
                url: normalizeOptionalText(state.referenceReelUrl),
                localFileName: normalizeOptionalText(state.referenceReelLocalFileName)
            }
            : undefined,
        selectedProjectItemIds: state.selectedProjectItemIds,
        manualClipIds: state.manualClipIds
    };
}
function validateAutoReelSetupState(state, context) {
    const setupConfig = buildSetupConfig(state);
    const setupValidation = (0, validation_1.validateAutoReelSetupConfig)(setupConfig);
    const fields = {};
    const general = [];
    if (state.targetDurationSeconds < 15 || state.targetDurationSeconds > 300) {
        fields.targetDurationSeconds = "Target duration must be between 15 and 300 seconds.";
    }
    if (state.minimumClipCount > state.maximumClipCount) {
        fields.clipCountRange = "Minimum clip count cannot exceed the maximum.";
    }
    else if (state.maximumClipCount > Math.max(context.availableClipCount, state.maximumClipCount)) {
        fields.clipCountRange = "Maximum clip count is too large for the available source clips.";
    }
    if (state.sourceMode === "selected-clips" && context.selectedClipCount === 0) {
        fields.sourceMode = "No selected timeline clips are available in Premiere right now.";
    }
    if (state.sourceMode === "project-items" && state.selectedProjectItemIds.length === 0) {
        fields.selectedProjectItemIds = "Choose at least one Project panel item or bin.";
    }
    if (state.sourceMode === "manual-selection" && state.manualClipIds.length === 0) {
        fields.manualClipIds = "Choose at least one manual clip reference.";
    }
    if (state.musicSourceMode === "local-file" && !state.musicLocalFileName.trim()) {
        fields.musicSource = "Choose a local audio file or switch the music mode.";
    }
    if (state.musicSourceMode === "project-item" && !state.musicProjectItemId.trim()) {
        fields.musicSource = "Choose a Premiere project audio item or switch the music mode.";
    }
    if (state.musicSourceMode === "authorized-direct-url" && !isDirectMediaUrl(state.musicDirectUrl)) {
        fields.musicSource = "Enter a valid direct audio URL ending in a media file extension.";
    }
    if (state.musicSourceMode === "social-reference" && !isSocialReferenceUrl(state.musicSocialReferenceUrl)) {
        fields.musicSource = "Enter a valid Instagram or YouTube reference link.";
    }
    if (state.musicSourceMode !== "none" && !state.copyrightNoticeAccepted) {
        fields.musicSource = "Acknowledge the copyright notice before using a music source.";
    }
    if (state.referenceReelUrl.trim() && !isReferenceUrl(state.referenceReelUrl)) {
        fields.referenceReel = "Enter a valid Instagram or YouTube URL.";
    }
    if (!state.outputSequenceName.trim()) {
        fields.outputSequenceName = "Output sequence name is required.";
    }
    for (const issue of setupValidation.issues) {
        if (issue.path.startsWith("clipFilter")) {
            fields.clipCountRange = fields.clipCountRange ?? issue.message;
        }
        else if (issue.path.startsWith("musicSource")) {
            fields.musicSource = fields.musicSource ?? issue.message;
        }
        else if (issue.path.startsWith("referenceReel")) {
            fields.referenceReel = fields.referenceReel ?? issue.message;
        }
        else if (issue.path in state) {
            fields[issue.path] = fields[issue.path] ?? issue.message;
        }
        else {
            general.push(issue.message);
        }
    }
    return {
        general,
        fields,
        issues: setupValidation.issues
    };
}
function serializeAutoReelSetupIntoRequest(state, base) {
    return {
        id: base.id,
        prompt: base.prompt,
        mediaSelection: base.mediaSelection,
        targetDurationSeconds: base.targetDurationSeconds,
        aspectRatio: state.aspectRatio,
        outputSequenceName: base.outputSequenceName,
        createNewSequence: true,
        styleHints: base.styleHints,
        preferredEvents: base.preferredEvents,
        excludedClipIds: base.excludedClipIds,
        submittedAt: base.submittedAt,
        setup: buildSetupConfig(state)
    };
}
function getAutoReelLayoutMode(width) {
    if (width <= 320) {
        return "compact";
    }
    if (width <= 640) {
        return "medium";
    }
    if (width <= 1080) {
        return "regular";
    }
    return "wide";
}
function getAutoReelEffectiveWidth(workspaceWidth, viewportWidth) {
    if (typeof workspaceWidth === "number" && Number.isFinite(workspaceWidth) && workspaceWidth > 0) {
        return workspaceWidth;
    }
    return Math.max(0, viewportWidth);
}
function fieldFlex(layoutMode) {
    switch (layoutMode) {
        case "compact":
            return "1 1 100%";
        case "medium":
            return "1 1 calc(50% - 12px)";
        case "regular":
            return "1 1 calc(33.333% - 16px)";
        default:
            return "1 1 calc(25% - 18px)";
    }
}
function isReferenceUrl(value) {
    return isSocialReferenceUrl(value);
}
function isDirectMediaUrl(value) {
    if (!isHttpUrl(value)) {
        return false;
    }
    return /\.(mp3|wav|aif|aiff|m4a|aac|flac|ogg)$/i.test(value.trim());
}
function isSocialReferenceUrl(value) {
    if (!isHttpUrl(value)) {
        return false;
    }
    return /(instagram\.com|youtu\.be|youtube\.com)/i.test(value.trim());
}
function isHttpUrl(value) {
    try {
        const parsed = new URL(value.trim());
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    }
    catch {
        return false;
    }
}
function normalizeOptionalText(value) {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
}


/***/ },

/***/ 1676
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadAutoReelSetupContext = loadAutoReelSetupContext;
exports.createSetupStateFromDraft = createSetupStateFromDraft;
exports.runAutoReelSetup = runAutoReelSetup;
exports.loadAutoReelSetupDraft = loadAutoReelSetupDraft;
const brain_1 = __webpack_require__(7021);
const PremiereBridge_1 = __webpack_require__(1862);
const PremiereAPI_1 = __webpack_require__(868);
const assetService_1 = __webpack_require__(8759);
const promptReelService_1 = __webpack_require__(2541);
const AutoReelJobMemory_1 = __webpack_require__(8542);
const autoReelExtractionService_1 = __webpack_require__(578);
const autoReelScanner_1 = __webpack_require__(9652);
const autoReelSetupConfig_1 = __webpack_require__(8489);
const validation_1 = __webpack_require__(3492);
const models_1 = __webpack_require__(5225);
const memory = new brain_1.MemoryEngine();
const contextEngine = new brain_1.ContextEngine();
const jobMemory = new AutoReelJobMemory_1.AutoReelJobMemory(memory);
async function loadAutoReelSetupContext() {
    const bridge = new PremiereBridge_1.PremiereBridge();
    const [sequenceContext, timeline, project, activeSequence] = await Promise.all([
        contextEngine.readSequenceContext(),
        bridge.readTimeline(),
        PremiereAPI_1.premiereAPI.getCurrentProject().catch(() => null),
        PremiereAPI_1.premiereAPI.getActiveSequence().catch(() => null)
    ]);
    const connected = timeline !== null && sequenceContext !== null;
    const projectName = normalizeText(project?.name, sequenceContext?.projectName ?? "");
    const sequenceName = normalizeText(activeSequence?.name, sequenceContext?.sequenceName ?? "");
    const activeProjectId = createProjectId(projectName);
    const activeSequenceId = createSequenceId(activeSequence, sequenceName);
    const sequenceOptions = await readSequenceOptions(project, activeSequenceId, sequenceName);
    const sequenceClips = flattenTimelineClips(timeline, sequenceContext?.selectedClips ?? []);
    const selectedClips = buildSelectedClips(timeline, sequenceContext?.selectedClips ?? []);
    const assetRecords = await (0, assetService_1.readAssetRecords)(sequenceContext);
    const projectItemOptions = assetRecords.assets
        .filter((asset) => asset.source === "project")
        .map((asset) => ({
        id: asset.id,
        label: asset.name,
        mediaPath: asset.mediaPath ?? undefined,
        projectItemId: asset.projectItemId,
        nodeId: asset.nodeId,
        ancestorIds: asset.ancestorIds,
        type: asset.type
    }));
    const projectAudioOptions = projectItemOptions.filter((item) => /audio|sound|music/i.test(item.type) || /\.(mp3|wav|aac|m4a|aif|aiff|flac|ogg)$/i.test(item.mediaPath ?? ""));
    const cachedMusicOptions = (0, promptReelService_1.getPromptReelMusicOptions)().map((entry) => ({
        id: entry.fileHash,
        label: entry.fileName,
        bpm: entry.bpm,
        source: "cached-music-ai"
    }));
    const musicOptions = [
        ...cachedMusicOptions,
        ...projectAudioOptions.map((item) => ({
            id: item.id,
            label: item.label,
            source: "project-item"
        }))
    ];
    return {
        connected,
        projectOptions: projectName ? [{ id: activeProjectId, name: projectName, active: true }] : [],
        sequenceOptions,
        activeProjectId,
        activeSequenceId,
        projectName,
        sequenceName,
        clipCount: sequenceClips.length,
        selectedClipCount: selectedClips.length,
        inPointSeconds: timeline?.inPoint ?? sequenceContext?.inPoint ?? 0,
        outPointSeconds: timeline?.outPoint ?? sequenceContext?.outPoint ?? 0,
        durationSeconds: timeline?.duration ?? sequenceContext?.duration ?? 0,
        fps: timeline?.fps ?? sequenceContext?.fps ?? 0,
        timebase: timeline?.timebase ?? null,
        frameSize: timeline?.frameSize ?? null,
        projectItemOptions,
        manualClipOptions: sequenceClips.map((clip) => ({
            id: clip.id,
            label: `${clip.name} • ${formatSeconds(clip.start)}-${formatSeconds(clip.end)}`,
            projectItemId: clip.projectItemId,
            startSeconds: clip.start,
            endSeconds: clip.end,
            mediaType: clip.mediaType
        })),
        musicOptions,
        selectedClips,
        sequenceClips,
        timeline,
        lockedTrackSupport: "unavailable"
    };
}
function createSetupStateFromDraft(draft, context) {
    const base = (0, autoReelSetupConfig_1.createDefaultAutoReelSetupState)();
    const sequenceName = context?.sequenceName || "Auto Reel";
    return (0, autoReelSetupConfig_1.createDefaultAutoReelSetupState)({
        ...base,
        ...(draft?.state ?? {}),
        outputSequenceName: draft?.state?.outputSequenceName?.trim() ||
            `${labelForReelType(draft?.state?.reelType ?? base.reelType)} - ${sequenceName}`
    });
}
async function runAutoReelSetup(args) {
    const context = await loadAutoReelSetupContext();
    const log = [];
    if (!context.connected || !context.sequenceName || !context.timeline) {
        throw new Error("Open an active Premiere project and sequence before starting Auto Reel.");
    }
    const validation = (0, autoReelSetupConfig_1.validateAutoReelSetupState)(args.state, {
        availableClipCount: context.clipCount,
        selectedClipCount: context.selectedClipCount,
        availableProjectItemIds: context.projectItemOptions.map((item) => item.id),
        availableManualClipIds: context.manualClipOptions.map((clip) => clip.id)
    });
    if (validation.general.length > 0 || Object.keys(validation.fields).length > 0) {
        throw new Error([
            ...validation.general,
            ...Object.values(validation.fields).filter((value) => typeof value === "string" && value.length > 0)
        ].join(" "));
    }
    const pendingSelection = buildPendingSelection(context, args.state);
    const baseRequest = (0, autoReelSetupConfig_1.serializeAutoReelSetupIntoRequest)(args.state, {
        id: `auto-reel-request-${Date.now()}`,
        prompt: buildPrompt(args.state, context, pendingSelection),
        mediaSelection: pendingSelection,
        targetDurationSeconds: args.state.targetDurationSeconds,
        outputSequenceName: args.state.outputSequenceName.trim(),
        styleHints: buildStyleHints(args.state),
        preferredEvents: preferredEventsForType(args.state.reelType),
        excludedClipIds: [],
        submittedAt: new Date().toISOString()
    });
    const baseRequestValidation = (0, validation_1.validateAutoReelRequest)(baseRequest);
    if (!baseRequestValidation.valid || !baseRequestValidation.value) {
        throw new Error(`Auto Reel setup is invalid: ${baseRequestValidation.issues.map((issue) => `${issue.path} ${issue.message}`).join("; ")}`);
    }
    let job = (0, models_1.createAutoReelJob)(baseRequestValidation.value, `auto-reel-job-${Date.now()}`);
    jobMemory.save(job);
    log.push(`Loaded project "${context.projectName || "Unknown Project"}".`);
    log.push(`Using sequence "${context.sequenceName}" at ${formatSeconds(context.durationSeconds)} total duration.`);
    log.push(`Configured ${labelForReelType(args.state.reelType)} in ${args.state.storyMode} story mode with ${args.state.targetDurationSeconds}s target duration.`);
    job = updateJob(job, "validating", progress(1, 3, "Validating Auto Reel setup"), log, "Validated Phase 4 Auto Reel setup fields.");
    emitProgress(args.onProgress, job, log, "Validation complete. Preparing real timeline scan.");
    job = updateJob(job, "scanning", progress(0, Math.max(1, context.clipCount), "Starting real timeline/media scan"), log, "Starting real Phase 4 timeline/media scan.");
    emitProgress(args.onProgress, job, log, "Starting real timeline/media scan.");
    try {
        const scanResult = await (0, autoReelScanner_1.scanAutoReelTimeline)({
            projectId: args.projectId,
            sequenceId: args.sequenceId,
            sequenceName: context.sequenceName,
            timeline: context.timeline,
            state: args.state,
            projectItemOptions: context.projectItemOptions,
            signal: args.signal,
            onProgress: (scannerProgress) => {
                job = saveJob(job, {
                    progress: progress(scannerProgress.current, scannerProgress.total, scannerProgress.message)
                });
                emitProgress(args.onProgress, job, log, scannerProgress.message);
            }
        });
        const request = (0, autoReelSetupConfig_1.serializeAutoReelSetupIntoRequest)(args.state, {
            id: baseRequest.id,
            prompt: buildPrompt(args.state, context, scanResult.selection),
            mediaSelection: scanResult.selection,
            targetDurationSeconds: args.state.targetDurationSeconds,
            outputSequenceName: args.state.outputSequenceName.trim(),
            styleHints: buildStyleHints(args.state),
            preferredEvents: preferredEventsForType(args.state.reelType),
            excludedClipIds: [],
            submittedAt: baseRequest.submittedAt
        });
        const requestValidation = (0, validation_1.validateAutoReelRequest)(request);
        if (!requestValidation.valid || !requestValidation.value) {
            throw new Error(`Auto Reel setup is invalid: ${requestValidation.issues.map((issue) => `${issue.path} ${issue.message}`).join("; ")}`);
        }
        const setupWarnings = buildSetupWarnings(args.state, context, scanResult.selection);
        const combinedWarnings = [...scanResult.warnings, ...setupWarnings];
        log.push(...scanResult.log);
        log.push(`Captured ${scanResult.descriptors.length} clip descriptors for extraction and later planning.`);
        log.push(describeSelection(scanResult.selection));
        log.push(describeMusicSource(args.state));
        log.push(describeReferences(args.state));
        log.push(describeReferenceReel(args.state));
        job = saveJob(job, {
            request: requestValidation.value,
            clips: scanResult.descriptors,
            warnings: combinedWarnings,
            progress: progress(scanResult.descriptors.length, Math.max(1, scanResult.descriptors.length), "Scanner complete. Ready for planning review")
        });
        emitProgress(args.onProgress, job, log, scanResult.planningText);
        job = updateJob(job, "extracting", progress(0, Math.max(1, scanResult.descriptors.length), "Starting frame and audio extraction"), log, "Starting Phase 4 frame/audio extraction with the local-only sidecar when available.");
        emitProgress(args.onProgress, job, log, "Starting Phase 4 frame/audio extraction.");
        const extractionStage = await (0, autoReelExtractionService_1.runAutoReelExtractionStage)({
            job,
            request: requestValidation.value,
            clips: scanResult.descriptors,
            context,
            signal: args.signal,
            onProgress: (extraction) => {
                const totalUnits = Math.max(1, extraction.progress.totalClips + extraction.progress.totalAudioTasks);
                const completedUnits = extraction.progress.completedClips + extraction.progress.completedAudioTasks;
                job = saveJob(job, {
                    frameSamples: extraction.frameSamples,
                    audioExtractions: extraction.audioExtractions,
                    extraction,
                    extractionFailures: extraction.failures,
                    warnings: dedupeStrings([...combinedWarnings, ...extraction.warnings]),
                    progress: progress(completedUnits, totalUnits, (0, autoReelExtractionService_1.buildExtractionProgressMessage)(extraction))
                });
                emitProgress(args.onProgress, job, log, extraction.status === "sidecar-unavailable" ? extraction.sidecar.reason || extractionStagePlanningText(extraction) : extractionStagePlanningText(extraction));
            }
        });
        log.push(...extractionStage.warnings.map((warning) => `Extraction warning: ${warning}`));
        job = saveJob(job, {
            frameSamples: extractionStage.frameSamples,
            audioExtractions: extractionStage.audioExtractions,
            extraction: extractionStage.extraction,
            extractionFailures: extractionStage.failures,
            warnings: dedupeStrings([...combinedWarnings, ...extractionStage.warnings]),
            progress: progress(extractionStage.extraction.progress.completedClips + extractionStage.extraction.progress.completedAudioTasks, Math.max(1, extractionStage.extraction.progress.totalClips + extractionStage.extraction.progress.totalAudioTasks), (0, autoReelExtractionService_1.buildExtractionProgressMessage)(extractionStage.extraction))
        });
        emitProgress(args.onProgress, job, log, extractionStage.planningText);
        job = updateJob(job, "awaiting_review", progress(1, 1, "Extraction complete. Waiting for Phase 4 approval"), log, "Phase 4 extraction complete. Vision AI, Music AI analysis, scoring, story building, planning, execution, and export have not started.");
        emitProgress(args.onProgress, job, log, extractionStage.planningText);
        persistSetupDraft({
            projectId: args.projectId,
            sequenceId: args.sequenceId,
            state: args.state
        });
        persistSetupAssets(job.id, args.state);
        memory.setAnalysis(`auto-reel:request:${job.id}`, "request", requestValidation.value);
        memory.setAnalysis(`auto-reel:scan:${scanResult.selection.cacheKey}`, "result", {
            scannedAt: new Date().toISOString(),
            selection: scanResult.selection,
            descriptors: scanResult.descriptors,
            warnings: combinedWarnings
        });
        memory.setAnalysis(`auto-reel:extraction:${job.id}`, "result", extractionStage.extraction);
        return {
            job,
            context,
            log,
            request: requestValidation.value,
            planningText: extractionStage.planningText
        };
    }
    catch (error) {
        if ((0, autoReelScanner_1.isAutoReelScanCancelledError)(error) || (0, autoReelExtractionService_1.isAutoReelExtractionCancelledError)(error)) {
            log.push("Auto Reel scan/extraction was cancelled before later analysis phases.");
            job = updateJob(job, "cancelled", progress(job.progress.current, Math.max(1, job.progress.total), "Extraction cancelled"), log, "Auto Reel scan/extraction cancelled before later analysis phases.");
            emitProgress(args.onProgress, job, log, "Auto Reel extraction cancelled before Vision AI, Music AI, or planning.");
        }
        throw error;
    }
}
function loadAutoReelSetupDraft() {
    const stored = memory.getAnalysis("auto-reel:setup", "draft");
    if (!isRecord(stored) || !isRecord(stored.state)) {
        return null;
    }
    return {
        projectId: normalizeText(stored.projectId, ""),
        sequenceId: normalizeText(stored.sequenceId, ""),
        state: (0, autoReelSetupConfig_1.createDefaultAutoReelSetupState)(stored.state)
    };
}
function persistSetupDraft(draft) {
    memory.setAnalysis("auto-reel:setup", "draft", draft);
}
function persistSetupAssets(jobId, state) {
    memory.setAnalysis(`auto-reel:setup:${jobId}`, "assets", {
        references: state.references.map((reference) => ({
            id: reference.id,
            role: reference.role,
            label: reference.label,
            fileName: reference.fileName ?? ""
        })),
        referenceReelUrl: state.referenceReelUrl.trim(),
        referenceReelLocalFileName: state.referenceReelLocalFileName.trim()
    });
}
function updateJob(job, nextState, nextProgress, log, line) {
    log.push(line);
    const updated = (0, models_1.transitionAutoReelJob)(job, nextState, { progress: nextProgress, reason: line });
    jobMemory.save(updated);
    return updated;
}
function progress(current, total, message) {
    return { current, total, message };
}
async function readSequenceOptions(project, activeSequenceId, activeSequenceName) {
    if (!isRecord(project) || typeof project.getSequences !== "function") {
        return activeSequenceName ? [{ id: activeSequenceId, name: activeSequenceName, active: true }] : [];
    }
    try {
        const raw = await project.getSequences();
        if (!Array.isArray(raw) || raw.length === 0) {
            return activeSequenceName ? [{ id: activeSequenceId, name: activeSequenceName, active: true }] : [];
        }
        return raw.map((sequence, index) => {
            const name = normalizeText(isRecord(sequence) ? sequence.name : "", `Sequence ${index + 1}`);
            const id = createSequenceId(sequence, name);
            return { id, name, active: id === activeSequenceId };
        });
    }
    catch {
        return activeSequenceName ? [{ id: activeSequenceId, name: activeSequenceName, active: true }] : [];
    }
}
function flattenTimelineClips(timeline, selectedClips) {
    if (!timeline) {
        return selectedClips;
    }
    return [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) => track.clips.map((clip) => ({
        id: clip.id,
        name: clip.name,
        start: clip.start,
        end: clip.end,
        duration: clip.duration,
        track: clip.trackIndex,
        mediaType: clip.mediaType,
        type: track.type,
        projectItemId: clip.projectItemId ?? undefined
    })));
}
function buildSelectedClips(timeline, fallbackSelectedClips) {
    if (!timeline) {
        return fallbackSelectedClips;
    }
    return [...timeline.videoTracks, ...timeline.audioTracks]
        .flatMap((track) => track.clips
        .filter((clip) => clip.selected)
        .map((clip) => ({
        id: clip.id,
        name: clip.name,
        start: clip.start,
        end: clip.end,
        duration: clip.duration,
        track: clip.trackIndex,
        mediaType: clip.mediaType,
        type: track.type,
        projectItemId: clip.projectItemId ?? undefined
    })));
}
function buildPendingSelection(context, state) {
    return {
        mode: state.sourceMode,
        projectId: context.activeProjectId,
        sequenceId: context.activeSequenceId,
        sequenceName: context.sequenceName,
        clipIds: [],
        projectItemIds: [],
        inPointSeconds: context.inPointSeconds,
        outPointSeconds: context.outPointSeconds,
        usedFallback: false,
        sequenceResolution: context.frameSize,
        fps: context.fps || null,
        timebase: context.timebase,
        playheadSeconds: context.timeline?.playhead ?? null,
        selectedClipCount: context.selectedClipCount,
        scannedClipCount: 0,
        mediaFingerprint: "pending-scan",
        cacheKey: "pending-scan",
        capabilityNotes: []
    };
}
function buildSetupWarnings(state, context, selection) {
    const warnings = [];
    if (selection.usedFallback) {
        warnings.push("The requested source mode did not resolve a full clip set, so Auto Reel recorded a fallback state.");
    }
    if (context.lockedTrackSupport === "unavailable") {
        warnings.push("This host session does not expose locked-track state yet. The include/exclude locked tracks toggle is recorded but not enforced.");
    }
    if (state.musicSourceMode === "project-item" && !state.musicProjectItemId) {
        warnings.push("No Premiere project audio item is selected yet.");
    }
    if (state.musicSourceMode === "social-reference") {
        warnings.push("Social music links remain reference-only and will not be downloaded or analyzed as source audio.");
    }
    if (!state.references.some((reference) => Boolean(reference.fileName))) {
        warnings.push("No person reference images are attached yet.");
    }
    if (!state.referenceReelUrl.trim() && !state.referenceReelLocalFileName.trim()) {
        warnings.push("No reference reel is attached yet.");
    }
    return warnings;
}
function saveJob(job, patch) {
    const updated = {
        ...job,
        ...patch,
        updatedAt: new Date().toISOString()
    };
    jobMemory.save(updated);
    return updated;
}
function emitProgress(onProgress, job, log, planningText) {
    onProgress?.({
        job,
        log: [...log],
        planningText
    });
}
function extractionStagePlanningText(extraction) {
    if (extraction.status === "sidecar-unavailable") {
        return extraction.sidecar.reason || "Frame/audio extraction is unavailable because the local sidecar is not reachable.";
    }
    return "Frame/audio extraction is running. Later Vision AI, Music AI, scoring, story building, and planning phases remain disabled.";
}
function dedupeStrings(values) {
    return values.filter((value, index) => values.indexOf(value) === index);
}
function buildPrompt(state, context, selection) {
    return [
        `Create a ${labelForReelType(state.reelType)} for ${context.sequenceName}.`,
        `Use ${selection.mode.replaceAll("-", " ")} as the source mode.`,
        `Target duration ${state.targetDurationSeconds} seconds.`,
        `Story mode ${state.storyMode}, style ${state.style}, balance ${state.balanceTarget}, energy ${state.energy}.`,
        `Output sequence ${state.outputSequenceName.trim()}.`
    ].join(" ");
}
function buildStyleHints(state) {
    return [
        labelForReelType(state.reelType),
        `style:${state.style}`,
        `story:${state.storyMode}`,
        `emotion:${state.emotionPriority}`,
        `balance:${state.balanceTarget}`,
        `energy:${state.energy}`,
        `cuts:${state.cutDensity}`,
        `transition:${state.transitionIntensity}`,
        `motion:${state.motionIntensity}`,
        `sfx:${state.sfxIntensity}`,
        `color:${state.colorIntensity}`,
        `music:${state.musicSourceMode}`
    ];
}
function preferredEventsForType(reelType) {
    switch (reelType) {
        case "cinematic-reel":
            return ["Bride Entry", "Varmala", "Pheras", "Decor", "Drone"];
        case "emotional-reel":
            return ["Bride Entry", "Varmala", "Pheras", "Reception"];
        case "couple-reel":
            return ["Couple Portrait", "Bride Entry", "Varmala"];
        case "dance-reel":
            return ["Sangeet", "Baraat", "Reception", "Dance"];
        case "reception-reel":
            return ["Reception", "Cake", "Dance"];
        default:
            return ["Bride Entry", "Varmala", "Pheras", "Reception"];
    }
}
function describeSelection(selection) {
    return `Resolved ${selection.clipIds.length} clips from ${selection.mode.replaceAll("-", " ")}${selection.usedFallback ? " with fallback" : ""}.`;
}
function describeMusicSource(state) {
    switch (state.musicSourceMode) {
        case "local-file":
            return state.musicLocalFileName
                ? `Music source set to local file "${state.musicLocalFileName}".`
                : "Music source is configured for a local file, but no file is selected yet.";
        case "project-item":
            return state.musicProjectItemId
                ? `Music source set to Premiere project item "${state.musicProjectItemId}".`
                : "Music source is configured for a Premiere project item, but no item is selected yet.";
        case "authorized-direct-url":
            return `Music source set to authorized direct URL ${state.musicDirectUrl.trim() || "(missing URL)"}.`;
        case "social-reference":
            return `Music source uses social reference-only link ${state.musicSocialReferenceUrl.trim() || "(missing URL)"} with no download or licensed use implied.`;
        default:
            return "Music source is disabled. Auto Reel will plan without music-driven timing.";
    }
}
function describeReferences(state) {
    const attached = state.references.filter((reference) => reference.fileName);
    return attached.length > 0
        ? `Reference images attached: ${attached.map((reference) => `${reference.label} (${reference.fileName})`).join(", ")}.`
        : "No bride, groom, family, or custom reference image is attached yet.";
}
function describeReferenceReel(state) {
    if (state.referenceReelLocalFileName.trim()) {
        return `Reference reel file attached: ${state.referenceReelLocalFileName.trim()} (reference only).`;
    }
    if (state.referenceReelUrl.trim()) {
        return `Reference reel URL attached: ${state.referenceReelUrl.trim()} (reference only).`;
    }
    return "No reference reel attached yet.";
}
function createProjectId(name) {
    return name ? `project:${name}` : "project:active";
}
function createSequenceId(sequence, fallbackName) {
    if (isRecord(sequence)) {
        const guid = normalizeText(sequence.guid, "");
        if (guid) {
            return `sequence:${guid}`;
        }
        const id = normalizeText(sequence.id, "");
        if (id) {
            return `sequence:${id}`;
        }
    }
    return `sequence:${fallbackName || "active"}`;
}
function labelForReelType(reelType) {
    switch (reelType) {
        case "cinematic-reel":
            return "Cinematic Reel";
        case "emotional-reel":
            return "Emotional Reel";
        case "couple-reel":
            return "Couple Reel";
        case "dance-reel":
            return "Dance Reel";
        case "reception-reel":
            return "Reception Reel";
        default:
            return "Wedding Highlight";
    }
}
function formatSeconds(totalSeconds) {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;
    return [hours, minutes, remainder].map((value) => String(value).padStart(2, "0")).join(":");
}
function normalizeText(value, fallback) {
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return fallback;
}
function isRecord(value) {
    return typeof value === "object" && value !== null;
}


/***/ },

/***/ 7950
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.AutoReelSidecarClient = exports.AutoReelSidecarCancelledError = exports.AutoReelSidecarUnavailableError = void 0;
__webpack_unused_export__ = mapSidecarHealthResponse;
const SIDECAR_HOST = "127.0.0.1";
const SIDECAR_START_TIMEOUT_MS = 7000;
const SIDECAR_POLL_INTERVAL_MS = 250;
class AutoReelSidecarUnavailableError extends Error {
    constructor(message) {
        super(message);
        this.name = "AutoReelSidecarUnavailableError";
    }
}
exports.AutoReelSidecarUnavailableError = AutoReelSidecarUnavailableError;
class AutoReelSidecarCancelledError extends Error {
    constructor(message = "Auto Reel extraction was cancelled.") {
        super(message);
        this.name = "AutoReelSidecarCancelledError";
    }
}
exports.AutoReelSidecarCancelledError = AutoReelSidecarCancelledError;
class AutoReelSidecarClient {
    session = null;
    async ensureReady() {
        if (this.session) {
            const connected = await this.fetchHealth(this.session);
            if (connected.available) {
                return connected;
            }
            this.session = null;
        }
        const started = await this.tryStartSidecar();
        if (!started) {
            return {
                available: false,
                status: "unavailable",
                capabilities: [],
                reason: "Local analysis sidecar is unavailable. Start analysis-sidecar manually or use a runtime that can spawn Python."
            };
        }
        this.session = started;
        return this.fetchHealth(started);
    }
    async runExtractionJob(request, options = {}) {
        const health = await this.ensureReady();
        if (!health.available || !this.session) {
            throw new AutoReelSidecarUnavailableError(health.reason || "Local analysis sidecar is unavailable.");
        }
        const submit = await this.requestJson(this.session, "/extraction/jobs", {
            method: "POST",
            body: JSON.stringify(request)
        });
        if (!submit?.jobId) {
            throw new AutoReelSidecarUnavailableError("Local analysis sidecar did not return an extraction job ID.");
        }
        let aborted = false;
        const abortHandler = () => {
            aborted = true;
            void this.cancelJob(submit.jobId).catch(() => undefined);
        };
        options.signal?.addEventListener("abort", abortHandler, { once: true });
        try {
            for (;;) {
                if (aborted || options.signal?.aborted) {
                    throw new AutoReelSidecarCancelledError();
                }
                const result = await this.requestJson(this.session, `/extraction/jobs/${encodeURIComponent(submit.jobId)}`);
                options.onProgress?.(result);
                if (isTerminalExtractionStatus(result?.status)) {
                    return result;
                }
                await delay(SIDECAR_POLL_INTERVAL_MS);
            }
        }
        finally {
            options.signal?.removeEventListener("abort", abortHandler);
        }
    }
    async cancelJob(jobId) {
        if (!this.session) {
            return;
        }
        await this.requestJson(this.session, `/extraction/jobs/${encodeURIComponent(jobId)}/cancel`, {
            method: "POST"
        });
    }
    async fetchHealth(session) {
        try {
            const payload = await this.requestJson(session, "/health");
            const capabilities = await this.requestJson(session, "/capabilities").catch(() => null);
            return mapSidecarHealthResponse(payload, capabilities, session.baseUrl);
        }
        catch (error) {
            return {
                available: false,
                status: "unavailable",
                capabilities: [],
                reason: error instanceof Error ? error.message : "Local analysis sidecar is unavailable."
            };
        }
    }
    async tryStartSidecar() {
        const runtime = resolveRuntimeModules();
        const scriptPath = resolveSidecarScript(runtime);
        if (!runtime.childProcess || !runtime.processRef || !scriptPath) {
            return null;
        }
        const token = createRandomToken();
        const port = 43000 + Math.floor(Math.random() * 1000);
        const pythonCandidates = uniqueStrings([
            runtime.processRef.env?.RKFLOW_ANALYSIS_SIDECAR_PYTHON,
            "python3.11",
            "python3"
        ]);
        for (const pythonCommand of pythonCandidates) {
            if (!canRunCommand(runtime, pythonCommand)) {
                continue;
            }
            try {
                runtime.childProcess
                    .spawn(pythonCommand, [
                    scriptPath,
                    "--host",
                    SIDECAR_HOST,
                    "--port",
                    String(port),
                    "--token",
                    token
                ], {
                    cwd: runtime.processRef.cwd?.(),
                    env: runtime.processRef.env,
                    detached: true,
                    stdio: "ignore"
                })
                    ?.unref?.();
                const session = {
                    baseUrl: `http://${SIDECAR_HOST}:${port}`,
                    token,
                    port,
                    pythonCommand
                };
                if (await waitForHealth(session)) {
                    return session;
                }
            }
            catch { }
        }
        return null;
    }
    async requestJson(session, route, init = {}) {
        if (typeof fetch !== "function") {
            throw new AutoReelSidecarUnavailableError("This runtime does not expose fetch(), so the local analysis sidecar cannot be reached.");
        }
        const response = await fetch(`${session.baseUrl}${route}`, {
            ...init,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.token}`,
                ...(init.headers ?? {})
            }
        });
        if (!response.ok) {
            const message = await response.text().catch(() => response.statusText);
            throw new AutoReelSidecarUnavailableError(message || `Sidecar request failed with ${response.status}.`);
        }
        return response.json();
    }
}
exports.AutoReelSidecarClient = AutoReelSidecarClient;
function mapSidecarHealthResponse(healthPayload, capabilitiesPayload, baseUrl) {
    const health = isRecord(healthPayload) ? healthPayload : {};
    const capabilities = isRecord(capabilitiesPayload) ? capabilitiesPayload : {};
    const localhostOnly = health.bind === SIDECAR_HOST || capabilities.bind === SIDECAR_HOST;
    const status = typeof health.status === "string" ? health.status : "unavailable";
    const available = status === "ok" && localhostOnly;
    const capabilityList = Array.isArray(capabilities.features)
        ? capabilities.features.filter((value) => typeof value === "string")
        : [];
    return {
        available,
        status: available ? "available" : "unavailable",
        baseUrl,
        version: typeof capabilities.version === "string" ? capabilities.version : typeof health.version === "string" ? health.version : undefined,
        pythonVersion: typeof capabilities.python_version === "string" ? capabilities.python_version : undefined,
        capabilities: capabilityList,
        reason: available
            ? undefined
            : typeof health.reason === "string"
                ? health.reason
                : "Local analysis sidecar did not report a localhost-only healthy state."
    };
}
function resolveRuntimeModules() {
    return {
        childProcess: resolveModule("child_process"),
        fs: resolveModule("fs"),
        path: resolveModule("path"),
        processRef: typeof process !== "undefined"
            ? process
            : (typeof globalThis !== "undefined" ? globalThis.process ?? null : null)
    };
}
function resolveModule(name) {
    const requireFn = (typeof globalThis !== "undefined" ? globalThis.require : undefined) ||
        (typeof window !== "undefined" ? window.require : undefined);
    if (typeof requireFn !== "function") {
        return null;
    }
    try {
        return requireFn(name);
    }
    catch {
        return null;
    }
}
function resolveSidecarScript(runtime) {
    const cwd = runtime.processRef?.cwd?.();
    if (!cwd || !runtime.path || !runtime.fs) {
        return null;
    }
    const scriptPath = runtime.path.join(cwd, "analysis-sidecar", "server.py");
    return runtime.fs.existsSync(scriptPath) ? scriptPath : null;
}
function canRunCommand(runtime, command) {
    if (!runtime.childProcess) {
        return false;
    }
    try {
        const result = runtime.childProcess.spawnSync(command, ["--version"], { stdio: "ignore" });
        return result.status === 0;
    }
    catch {
        return false;
    }
}
async function waitForHealth(session) {
    const startedAt = Date.now();
    while (Date.now() - startedAt <= SIDECAR_START_TIMEOUT_MS) {
        try {
            const response = await fetch(`${session.baseUrl}/health`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session.token}`
                }
            });
            if (response.ok) {
                return true;
            }
        }
        catch { }
        await delay(200);
    }
    return false;
}
function createRandomToken() {
    const cryptoRef = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
    if (cryptoRef?.getRandomValues) {
        const bytes = new Uint8Array(16);
        cryptoRef.getRandomValues(bytes);
        return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
    }
    return `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
}
function uniqueStrings(values) {
    return values.filter((value, index, list) => typeof value === "string" && value.length > 0 && list.indexOf(value) === index);
}
function isTerminalExtractionStatus(status) {
    return status === "completed" || status === "cancelled" || status === "failed" || status === "sidecar-unavailable";
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function delay(durationMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, durationMs);
    });
}


/***/ },

/***/ 423
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPromptReelPlan = toPromptReelPlan;
// The current AutoEditAssembler consumes Prompt Reel's plan shape. Keep conversion
// explicit until Phase 2 moves the active planner to the new domain model.
function toPromptReelPlan(plan) {
    return {
        title: plan.title,
        templateName: "Auto Reel",
        intentSummary: plan.intentSummary,
        targetDurationSeconds: plan.targetDurationSeconds,
        totalDurationSeconds: plan.totalDurationSeconds,
        selectionMode: "sequence",
        resolutionPath: "memory",
        clips: plan.segments.map((segment) => ({
            clipId: segment.clipId,
            clipName: segment.clipId,
            start: segment.sourceInSeconds,
            end: segment.sourceOutSeconds,
            sourceDuration: segment.sourceOutSeconds - segment.sourceInSeconds,
            durationSeconds: segment.durationSeconds,
            track: 0,
            mediaType: "video",
            projectItemId: segment.projectItemId,
            shotType: "planned",
            emotionWeight: 0,
            musicEnergyWeight: 0,
            shotWeight: 0,
            selectionScore: segment.score,
            reason: segment.reason,
            promptTags: []
        })),
        notes: plan.warnings
    };
}


/***/ },

/***/ 4251
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = void 0;
var AutoReelScreen_1 = __webpack_require__(8904);
Object.defineProperty(exports, "default", ({ enumerable: true, get: function () { return __importDefault(AutoReelScreen_1).default; } }));
__exportStar(__webpack_require__(5225), exports);
__exportStar(__webpack_require__(3492), exports);
__exportStar(__webpack_require__(8542), exports);
__exportStar(__webpack_require__(423), exports);
__exportStar(__webpack_require__(8489), exports);
__exportStar(__webpack_require__(1676), exports);


/***/ },

/***/ 5225
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTO_REEL_JOB_STATES = void 0;
exports.createAutoReelJob = createAutoReelJob;
exports.canTransitionAutoReelJob = canTransitionAutoReelJob;
exports.transitionAutoReelJob = transitionAutoReelJob;
exports.isActiveAutoReelJobState = isActiveAutoReelJobState;
exports.serializeAutoReelJob = serializeAutoReelJob;
exports.AUTO_REEL_JOB_STATES = [
    "idle",
    "validating",
    "scanning",
    "extracting",
    "analyzing_vision",
    "analyzing_faces",
    "analyzing_emotion",
    "analyzing_music",
    "scoring",
    "building_story",
    "planning",
    "awaiting_review",
    "executing",
    "completed",
    "cancelled",
    "failed"
];
const ACTIVE_JOB_STATES = new Set([
    "validating",
    "scanning",
    "extracting",
    "analyzing_vision",
    "analyzing_faces",
    "analyzing_emotion",
    "analyzing_music",
    "scoring",
    "building_story",
    "planning",
    "awaiting_review",
    "executing"
]);
const STATE_TRANSITIONS = {
    idle: ["validating", "cancelled"],
    validating: ["scanning", "failed", "cancelled"],
    scanning: ["extracting", "analyzing_vision", "analyzing_music", "scoring", "failed", "cancelled"],
    extracting: ["awaiting_review", "analyzing_vision", "analyzing_music", "scoring", "failed", "cancelled"],
    analyzing_vision: ["analyzing_faces", "analyzing_emotion", "analyzing_music", "scoring", "failed", "cancelled"],
    analyzing_faces: ["analyzing_emotion", "analyzing_music", "scoring", "failed", "cancelled"],
    analyzing_emotion: ["analyzing_music", "scoring", "failed", "cancelled"],
    analyzing_music: ["scoring", "failed", "cancelled"],
    scoring: ["building_story", "planning", "failed", "cancelled"],
    building_story: ["planning", "failed", "cancelled"],
    planning: ["awaiting_review", "failed", "cancelled"],
    awaiting_review: ["planning", "executing", "cancelled", "failed"],
    executing: ["completed", "failed", "cancelled"],
    completed: ["idle"],
    cancelled: ["idle"],
    failed: ["idle"]
};
function createAutoReelJob(request, id, createdAt = new Date().toISOString()) {
    return {
        schemaVersion: 1,
        id,
        state: "idle",
        request,
        progress: { current: 0, total: 0, message: "Waiting to validate request" },
        clips: [],
        frameSamples: [],
        audioExtractions: [],
        visionSignals: [],
        faceSignals: [],
        expressionSignals: [],
        weddingEventSignals: [],
        extractionFailures: [],
        scoreBreakdowns: [],
        storyBeats: [],
        revisions: [],
        transitions: [],
        warnings: [],
        createdAt,
        updatedAt: createdAt
    };
}
function canTransitionAutoReelJob(from, to) {
    return STATE_TRANSITIONS[from].includes(to);
}
function transitionAutoReelJob(job, nextState, options = {}) {
    if (!canTransitionAutoReelJob(job.state, nextState)) {
        throw new Error(`Invalid Auto Reel job transition: ${job.state} -> ${nextState}`);
    }
    const at = options.at ?? new Date().toISOString();
    const progress = options.progress ?? job.progress;
    return {
        ...job,
        state: nextState,
        progress,
        error: nextState === "failed" ? options.error ?? job.error ?? "Auto Reel job failed" : undefined,
        transitions: [
            ...job.transitions,
            { from: job.state, to: nextState, at, reason: options.reason }
        ],
        updatedAt: at
    };
}
function isActiveAutoReelJobState(state) {
    return ACTIVE_JOB_STATES.has(state);
}
function serializeAutoReelJob(job) {
    return JSON.stringify(job);
}


/***/ },

/***/ 3492
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateAutoReelRequest = validateAutoReelRequest;
exports.validateAutoReelSetupConfig = validateAutoReelSetupConfig;
exports.validateAiReelPlan = validateAiReelPlan;
exports.validateBridgeExecutionReport = validateBridgeExecutionReport;
exports.validatePersistedAutoReelJob = validatePersistedAutoReelJob;
exports.validateAutoReelAudioExtraction = validateAutoReelAudioExtraction;
exports.validateAutoReelExtractionResult = validateAutoReelExtractionResult;
const Command_1 = __webpack_require__(111);
const models_1 = __webpack_require__(5225);
function validateAutoReelRequest(input) {
    if (!isRecord(input)) {
        return invalid("request", "Expected an object.");
    }
    const issues = [];
    requireNonEmptyString(input, "id", issues);
    requireNonEmptyString(input, "prompt", issues);
    requireNonEmptyString(input, "outputSequenceName", issues);
    requireNonEmptyString(input, "submittedAt", issues);
    if (input.createNewSequence !== true) {
        issues.push({ path: "createNewSequence", message: "Auto Reel must create a new sequence." });
    }
    if (!isRecord(input.mediaSelection)) {
        issues.push({ path: "mediaSelection", message: "Expected media selection metadata." });
    }
    else {
        const selection = input.mediaSelection;
        if (!isStringArray(selection.clipIds)) {
            issues.push({ path: "mediaSelection.clipIds", message: "Expected a clip ID array." });
        }
        if (!isStringArray(selection.projectItemIds)) {
            issues.push({ path: "mediaSelection.projectItemIds", message: "Expected a project item ID array." });
        }
        if (typeof selection.usedFallback !== "boolean") {
            issues.push({ path: "mediaSelection.usedFallback", message: "Expected a fallback flag." });
        }
    }
    if (input.targetDurationSeconds !== undefined && !isPositiveNumber(input.targetDurationSeconds)) {
        issues.push({ path: "targetDurationSeconds", message: "Expected a positive duration." });
    }
    if (!isString(input.aspectRatio) || !["9:16", "16:9", "1:1", "4:5", "custom"].includes(input.aspectRatio)) {
        issues.push({ path: "aspectRatio", message: "Expected a supported aspect ratio." });
    }
    if (input.setup !== undefined) {
        const setupResult = validateAutoReelSetupConfig(input.setup);
        issues.push(...prefixIssues("setup", setupResult.issues));
    }
    return issues.length === 0
        ? { valid: true, value: input, issues }
        : { valid: false, issues };
}
function validateAutoReelSetupConfig(input) {
    if (!isRecord(input)) {
        return invalid("setup", "Expected an object.");
    }
    const issues = [];
    if (!isString(input.sourceMode) || !["selected-clips", "active-sequence", "in-out-range", "project-items", "manual-selection"].includes(input.sourceMode)) {
        issues.push({ path: "sourceMode", message: "Expected a supported media source mode." });
    }
    if (!isRecord(input.clipFilter)) {
        issues.push({ path: "clipFilter", message: "Expected clip filter settings." });
    }
    else {
        if (typeof input.clipFilter.includeLockedTracks !== "boolean") {
            issues.push({ path: "clipFilter.includeLockedTracks", message: "Expected a locked-track flag." });
        }
        if (typeof input.clipFilter.includeDisabledClips !== "boolean") {
            issues.push({ path: "clipFilter.includeDisabledClips", message: "Expected a disabled-clip flag." });
        }
        if (typeof input.clipFilter.includeAudioOnlyItems !== "boolean") {
            issues.push({ path: "clipFilter.includeAudioOnlyItems", message: "Expected an audio-only inclusion flag." });
        }
        if (typeof input.clipFilter.includeStillItems !== "boolean") {
            issues.push({ path: "clipFilter.includeStillItems", message: "Expected a still-item inclusion flag." });
        }
        if (!isPositiveNumber(input.clipFilter.minimumClipCount)) {
            issues.push({ path: "clipFilter.minimumClipCount", message: "Expected a positive minimum clip count." });
        }
        if (!isPositiveNumber(input.clipFilter.maximumClipCount)) {
            issues.push({ path: "clipFilter.maximumClipCount", message: "Expected a positive maximum clip count." });
        }
        if (isPositiveNumber(input.clipFilter.minimumClipCount) &&
            isPositiveNumber(input.clipFilter.maximumClipCount) &&
            input.clipFilter.maximumClipCount < input.clipFilter.minimumClipCount) {
            issues.push({ path: "clipFilter.maximumClipCount", message: "Maximum clip count must be greater than or equal to the minimum." });
        }
    }
    [
        "reelType",
        "style",
        "storyMode",
        "emotionPriority",
        "balanceTarget",
        "energy",
        "cutDensity",
        "transitionIntensity",
        "motionIntensity",
        "sfxIntensity",
        "colorIntensity",
        "outputSequenceName"
    ].forEach((field) => requireNonEmptyString(input, field, issues));
    if (!isString(input.aspectRatio) || !["9:16", "16:9", "1:1", "4:5", "custom"].includes(input.aspectRatio)) {
        issues.push({ path: "aspectRatio", message: "Expected a supported aspect ratio." });
    }
    if (input.createNewSequence !== true) {
        issues.push({ path: "createNewSequence", message: "Auto Reel setup must create a new sequence." });
    }
    if (!Array.isArray(input.selectedProjectItemIds) || !input.selectedProjectItemIds.every(isString)) {
        issues.push({ path: "selectedProjectItemIds", message: "Expected a project-item ID array." });
    }
    if (!Array.isArray(input.manualClipIds) || !input.manualClipIds.every(isString)) {
        issues.push({ path: "manualClipIds", message: "Expected a manual clip ID array." });
    }
    if (!isRecord(input.musicSource)) {
        issues.push({ path: "musicSource", message: "Expected music source settings." });
    }
    else {
        if (!isString(input.musicSource.mode) ||
            !["none", "local-file", "project-item", "authorized-direct-url", "social-reference"].includes(input.musicSource.mode)) {
            issues.push({ path: "musicSource.mode", message: "Expected a supported music source mode." });
        }
        if (typeof input.musicSource.extractClipAudio !== "boolean") {
            issues.push({ path: "musicSource.extractClipAudio", message: "Expected a clip-audio extraction flag." });
        }
        if (typeof input.musicSource.copyrightNoticeAccepted !== "boolean") {
            issues.push({ path: "musicSource.copyrightNoticeAccepted", message: "Expected a copyright notice flag." });
        }
        if (input.musicSource.directUrl !== undefined && !isValidHttpUrl(input.musicSource.directUrl)) {
            issues.push({ path: "musicSource.directUrl", message: "Expected a valid direct media URL." });
        }
        if (input.musicSource.socialReferenceUrl !== undefined && !isValidHttpUrl(input.musicSource.socialReferenceUrl)) {
            issues.push({ path: "musicSource.socialReferenceUrl", message: "Expected a valid social reference URL." });
        }
    }
    if (!Array.isArray(input.references)) {
        issues.push({ path: "references", message: "Expected an array of person references." });
    }
    else {
        input.references.forEach((reference, index) => {
            const path = `references[${index}]`;
            if (!isRecord(reference)) {
                issues.push({ path, message: "Expected a reference object." });
                return;
            }
            requireNonEmptyString(reference, "id", issues, path);
            requireNonEmptyString(reference, "role", issues, path);
            requireNonEmptyString(reference, "label", issues, path);
        });
    }
    if (input.referenceReel !== undefined) {
        if (!isRecord(input.referenceReel)) {
            issues.push({ path: "referenceReel", message: "Expected reference reel metadata." });
        }
        else {
            if (!isString(input.referenceReel.mode) || !["url", "local-file"].includes(input.referenceReel.mode)) {
                issues.push({ path: "referenceReel.mode", message: "Expected a supported reference reel mode." });
            }
            if (input.referenceReel.url !== undefined && !isValidHttpUrl(input.referenceReel.url)) {
                issues.push({ path: "referenceReel.url", message: "Expected a valid reference reel URL." });
            }
        }
    }
    return issues.length === 0
        ? { valid: true, value: input, issues }
        : { valid: false, issues };
}
function validateAiReelPlan(input) {
    if (!isRecord(input)) {
        return invalid("plan", "Expected an object.");
    }
    const issues = [];
    ["id", "jobId", "requestId", "title", "intentSummary", "generatedAt"].forEach((field) => {
        requireNonEmptyString(input, field, issues);
    });
    requirePositiveNumber(input, "version", issues);
    requirePositiveNumber(input, "targetDurationSeconds", issues);
    requirePositiveNumber(input, "totalDurationSeconds", issues);
    if (!Array.isArray(input.segments) || input.segments.length === 0) {
        issues.push({ path: "segments", message: "Expected at least one planned segment." });
    }
    else {
        const segmentIds = new Set();
        input.segments.forEach((segment, index) => {
            const path = `segments[${index}]`;
            if (!isRecord(segment)) {
                issues.push({ path, message: "Expected a segment object." });
                return;
            }
            ["id", "storyBeatId", "clipId", "reason"].forEach((field) => {
                requireNonEmptyString(segment, field, issues, path);
            });
            ["order", "sourceInSeconds", "sourceOutSeconds", "timelineStartSeconds", "durationSeconds", "score"].forEach((field) => {
                requireFiniteNumber(segment, field, issues, path);
            });
            if (isString(segment.id)) {
                if (segmentIds.has(segment.id)) {
                    issues.push({ path: `${path}.id`, message: "Segment IDs must be unique." });
                }
                segmentIds.add(segment.id);
            }
            if (isFiniteNumber(segment.sourceInSeconds) && isFiniteNumber(segment.sourceOutSeconds) && segment.sourceOutSeconds <= segment.sourceInSeconds) {
                issues.push({ path, message: "Source out must be after source in." });
            }
            if (!isPositiveNumber(segment.durationSeconds)) {
                issues.push({ path: `${path}.durationSeconds`, message: "Duration must be positive." });
            }
            if (typeof segment.locked !== "boolean") {
                issues.push({ path: `${path}.locked`, message: "Expected a lock flag." });
            }
        });
    }
    ["storyBeats", "transitions", "motionDecisions", "sfxDecisions", "colorSuggestions", "rejectedClipIds", "warnings"].forEach((field) => {
        if (!Array.isArray(input[field])) {
            issues.push({ path: field, message: "Expected an array." });
        }
    });
    return issues.length === 0
        ? { valid: true, value: input, issues }
        : { valid: false, issues };
}
function validateBridgeExecutionReport(input) {
    if (!isRecord(input)) {
        return invalid("executionReport", "Expected an object.");
    }
    const issues = [];
    ["id", "jobId", "planId", "outputSequenceName", "startedAt", "status"].forEach((field) => {
        requireNonEmptyString(input, field, issues);
    });
    if (input.createdNewSequence !== true) {
        issues.push({ path: "createdNewSequence", message: "Execution must target a new sequence." });
    }
    if (input.sourceTimelineModified !== false) {
        issues.push({ path: "sourceTimelineModified", message: "Source timeline must remain untouched." });
    }
    if (!Array.isArray(input.actions)) {
        issues.push({ path: "actions", message: "Expected an action report array." });
    }
    else {
        input.actions.forEach((action, index) => {
            const path = `actions[${index}]`;
            if (!isRecord(action)) {
                issues.push({ path, message: "Expected an action report object." });
                return;
            }
            if (!isString(action.action) || !Command_1.COMMAND_ACTIONS.includes(action.action)) {
                issues.push({ path: `${path}.action`, message: "Unknown command action." });
            }
            requireNonEmptyString(action, "commandId", issues, path);
            requireNonEmptyString(action, "message", issues, path);
            requireNonEmptyString(action, "completedAt", issues, path);
            if (typeof action.success !== "boolean") {
                issues.push({ path: `${path}.success`, message: "Expected a success flag." });
            }
        });
    }
    return issues.length === 0
        ? { valid: true, value: input, issues }
        : { valid: false, issues };
}
function validatePersistedAutoReelJob(input) {
    if (!isRecord(input)) {
        return invalid("job", "Expected an object.");
    }
    const issues = [];
    if (input.schemaVersion !== 1) {
        issues.push({ path: "schemaVersion", message: "Unsupported Auto Reel job schema." });
    }
    requireNonEmptyString(input, "id", issues);
    requireNonEmptyString(input, "createdAt", issues);
    requireNonEmptyString(input, "updatedAt", issues);
    if (!isString(input.state) || !models_1.AUTO_REEL_JOB_STATES.includes(input.state)) {
        issues.push({ path: "state", message: "Unknown Auto Reel job state." });
    }
    const requestResult = validateAutoReelRequest(input.request);
    issues.push(...prefixIssues("request", requestResult.issues));
    if (!isRecord(input.progress) || !isFiniteNumber(input.progress.current) || !isFiniteNumber(input.progress.total) || !isString(input.progress.message)) {
        issues.push({ path: "progress", message: "Invalid job progress." });
    }
    ["clips", "frameSamples", "audioExtractions", "visionSignals", "faceSignals", "expressionSignals", "weddingEventSignals", "extractionFailures", "scoreBreakdowns", "storyBeats", "revisions", "transitions", "warnings"].forEach((field) => {
        if (!Array.isArray(input[field])) {
            issues.push({ path: field, message: "Expected an array." });
        }
    });
    if (input.extraction !== undefined) {
        const extractionResult = validateAutoReelExtractionResult(input.extraction);
        issues.push(...prefixIssues("extraction", extractionResult.issues));
    }
    if (input.plan !== undefined) {
        const planResult = validateAiReelPlan(input.plan);
        issues.push(...prefixIssues("plan", planResult.issues));
    }
    if (input.executionReport !== undefined) {
        const reportResult = validateBridgeExecutionReport(input.executionReport);
        issues.push(...prefixIssues("executionReport", reportResult.issues));
    }
    return issues.length === 0
        ? { valid: true, value: input, issues }
        : { valid: false, issues };
}
function validateAutoReelAudioExtraction(input) {
    if (!isRecord(input)) {
        return invalid("audioExtraction", "Expected an object.");
    }
    const issues = [];
    ["id", "taskId", "sourceKind", "cacheKey", "cacheStatus", "extractionStatus", "extractedAt"].forEach((field) => {
        requireNonEmptyString(input, field, issues);
    });
    if (!Array.isArray(input.waveform)) {
        issues.push({ path: "waveform", message: "Expected a waveform array." });
    }
    return issues.length === 0
        ? { valid: true, value: input, issues }
        : { valid: false, issues };
}
function validateAutoReelExtractionResult(input) {
    if (!isRecord(input)) {
        return invalid("extraction", "Expected an object.");
    }
    const issues = [];
    if (input.schemaVersion !== 1) {
        issues.push({ path: "schemaVersion", message: "Unsupported extraction schema." });
    }
    ["jobId", "requestId", "status", "startedAt", "completedAt"].forEach((field) => {
        requireNonEmptyString(input, field, issues);
    });
    if (!isRecord(input.sidecar)) {
        issues.push({ path: "sidecar", message: "Expected sidecar status metadata." });
    }
    else {
        requireNonEmptyString(input.sidecar, "status", issues, "sidecar");
    }
    if (!isRecord(input.progress)) {
        issues.push({ path: "progress", message: "Expected extraction progress metadata." });
    }
    else {
        const progress = input.progress;
        [
            "completedClips",
            "remainingClips",
            "totalClips",
            "completedAudioTasks",
            "totalAudioTasks",
            "cacheHits",
            "cacheMisses"
        ].forEach((field) => requireFiniteNumber(progress, field, issues, "progress"));
    }
    ["clipResults", "frameSamples", "audioExtractions", "failures", "warnings"].forEach((field) => {
        if (!Array.isArray(input[field])) {
            issues.push({ path: field, message: "Expected an array." });
        }
    });
    if (Array.isArray(input.audioExtractions)) {
        input.audioExtractions.forEach((entry, index) => {
            const result = validateAutoReelAudioExtraction(entry);
            issues.push(...prefixIssues(`audioExtractions[${index}]`, result.issues));
        });
    }
    return issues.length === 0
        ? { valid: true, value: input, issues }
        : { valid: false, issues };
}
function invalid(path, message) {
    return { valid: false, issues: [{ path, message }] };
}
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isString(value) {
    return typeof value === "string";
}
function isStringArray(value) {
    return Array.isArray(value) && value.every(isString);
}
function isFiniteNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
}
function isPositiveNumber(value) {
    return isFiniteNumber(value) && value > 0;
}
function isValidHttpUrl(value) {
    if (!isString(value) || value.trim().length === 0) {
        return false;
    }
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    }
    catch {
        return false;
    }
}
function requireNonEmptyString(record, field, issues, prefix = "") {
    const value = record[field];
    if (!isString(value) || value.trim().length === 0) {
        issues.push({ path: prefix ? `${prefix}.${field}` : field, message: "Expected a non-empty string." });
    }
}
function requireFiniteNumber(record, field, issues, prefix = "") {
    if (!isFiniteNumber(record[field])) {
        issues.push({ path: prefix ? `${prefix}.${field}` : field, message: "Expected a finite number." });
    }
}
function requirePositiveNumber(record, field, issues) {
    if (!isPositiveNumber(record[field])) {
        issues.push({ path: field, message: "Expected a positive number." });
    }
}
function prefixIssues(prefix, issues) {
    return issues.map((issue) => ({ path: `${prefix}.${issue.path}`, message: issue.message }));
}


/***/ },

/***/ 5187
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = CameraAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const ClipGrid_1 = __importDefault(__webpack_require__(1820));
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const perceptionAnalyzers_1 = __webpack_require__(990);
const useSequenceAnalysis_1 = __webpack_require__(8936);
function CameraAIScreen() {
    const [filter, setFilter] = (0, react_1.useState)("all");
    const { context, result, loading, progress, error, reanalyze } = (0, useSequenceAnalysis_1.useSequenceAnalysis)({
        moduleId: "camera-ai",
        analyze: perceptionAnalyzers_1.analyzeCamera
    });
    const shotTypes = (0, react_1.useMemo)(() => Array.from(new Set((result?.clips ?? []).map((clip) => clip.shotType))), [result?.clips]);
    const items = (result?.clips ?? [])
        .filter((clip) => filter === "all" || clip.shotType === filter)
        .map((clip) => ({
        id: clip.clipId,
        title: clip.clipName,
        subtitle: `${clip.shotType} • ${clip.movement}`,
        badges: [clip.source === "visual" ? "Visual" : "Metadata-only", clip.shotType, clip.movement],
        detail: `${(clip.confidence * 100).toFixed(0)}% confidence • ${clip.source}`
    }));
    if (!context) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Camera AI", children: "Open a sequence to analyze." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Camera AI", subtitle: result?.source ?? "Metadata-only classification", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setFilter("all"), style: chipButton(filter === "all"), children: "All" }), shotTypes.map((tag) => ((0, jsx_runtime_1.jsx)("button", { onClick: () => setFilter(tag), style: chipButton(filter === tag), children: tag }, tag)))] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void reanalyze(), disabled: loading, children: "Re-analyze" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [loading && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progress.percent, label: `${progress.completed}/${progress.total} clips` }), (0, jsx_runtime_1.jsx)("div", { style: { color: error ? theme_1.colors.danger : theme_1.colors.inkMuted }, children: error || progress.label })] })] }), (0, jsx_runtime_1.jsx)(ClipGrid_1.default, { items: items, emptyLabel: "No clips matched the selected shot type." })] }));
}
function chipButton(active) {
    return {
        borderRadius: 999,
        border: `1px solid ${active ? theme_1.colors.gold : theme_1.colors.border}`,
        background: active ? theme_1.colors.panelMuted : theme_1.colors.white,
        color: active ? theme_1.colors.maroonDeep : theme_1.colors.ink,
        padding: "6px 10px",
        cursor: "pointer"
    };
}


/***/ },

/***/ 2218
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.CaptionAIEngine = void 0;
const GeminiService_1 = __webpack_require__(5449);
const PremiereExecutor_1 = __webpack_require__(7365);
class CaptionAIEngine {
    executor = new PremiereExecutor_1.PremiereExecutor();
    async generateCaptions(text, language, style) {
        console.log(`Generating ${style} captions in ${language} for: "${text}"`);
        const prompt = `Generate captions for the following text in ${language}. The desired style is ${style}. If the style is 'karaoke', provide timestamps for each word. Text: "${text}"`;
        try {
            const result = await (0, GeminiService_1.runGemini)(prompt, { json: style === 'karaoke' });
            return result;
        }
        catch (error) {
            console.error("Error generating captions with Gemini:", error);
            return `Error generating captions: ${error}`;
        }
    }
    async insertCaptions(captions) {
        const result = await this.executor.runAction("INSERT_CAPTIONS", { captions });
        return result.success
            ? "Caption insertion submitted to Premiere."
            : `Caption insertion failed: ${result.error ?? result.message}`;
    }
}
exports.CaptionAIEngine = CaptionAIEngine;


/***/ },

/***/ 2917
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = ClipIntelligenceScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const ClipGrid_1 = __importDefault(__webpack_require__(1820));
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const perceptionAnalyzers_1 = __webpack_require__(990);
const useSequenceAnalysis_1 = __webpack_require__(8936);
function ClipIntelligenceScreen() {
    const [selectedClipId, setSelectedClipId] = (0, react_1.useState)(null);
    const { context, result, loading, progress, error, reanalyze } = (0, useSequenceAnalysis_1.useSequenceAnalysis)({
        moduleId: "clip-intelligence",
        analyze: perceptionAnalyzers_1.analyzeClipIntelligence
    });
    if (!context) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Clip Intelligence", children: "Open a sequence to analyze." });
    }
    const selectedClip = result?.clips.find((clip) => clip.clipId === selectedClipId) ?? null;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Clip Intelligence", subtitle: result?.formula ?? "Metadata fallback scoring", children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted, minWidth: 220 }, children: [loading && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progress.percent, label: `${progress.completed}/${progress.total} clips` }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: loading ? theme_1.spacing.xs : 0 }, children: error || progress.label })] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void reanalyze(), disabled: loading, children: "Re-analyze" })] }) }), (0, jsx_runtime_1.jsx)(ClipGrid_1.default, { items: (result?.clips ?? []).map((clip) => ({
                    id: clip.clipId,
                    title: clip.clipName,
                    subtitle: clip.source,
                    badges: [
                        clip.source === "visual" ? "Visual" : "Metadata-only",
                        clip.duplicateGroup ? `Duplicate: ${clip.duplicateGroup}` : "Unique"
                    ],
                    score: clip.aiRating,
                    detail: ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setSelectedClipId(clip.clipId), style: { border: "none", background: "transparent", color: theme_1.colors.maroon, cursor: "pointer", padding: 0 }, children: "View sub-score breakdown" }))
                })), emptyLabel: "No selected clips available for clip intelligence." }), selectedClip && ((0, jsx_runtime_1.jsx)(primitives_1.Card, { title: selectedClip.clipName, subtitle: "Technical breakdown", children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Metric, { label: "Blur", value: selectedClip.blur }), (0, jsx_runtime_1.jsx)(Metric, { label: "Focus", value: selectedClip.focus }), (0, jsx_runtime_1.jsx)(Metric, { label: "Noise", value: selectedClip.noise }), (0, jsx_runtime_1.jsx)(Metric, { label: "Exposure", value: selectedClip.exposure }), (0, jsx_runtime_1.jsx)(Metric, { label: "White Balance", value: selectedClip.whiteBalance })] }) }))] }));
}
function Metric({ label, value }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: `1px solid ${theme_1.colors.border}`, borderRadius: 10, padding: theme_1.spacing.sm, flex: "1 1 160px" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: 12 }, children: label }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontSize: 20, fontWeight: 700 }, children: value })] }));
}


/***/ },

/***/ 6528
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ColorAIEngine = void 0;
const PremiereExecutor_1 = __webpack_require__(7365);
const PremiereBridge_1 = __webpack_require__(1862);
const TimelineReader_1 = __webpack_require__(824);
class ColorAIEngine {
    executor = new PremiereExecutor_1.PremiereExecutor();
    timelineReader = new TimelineReader_1.TimelineReader(new PremiereBridge_1.PremiereBridge());
    async applyColorMatch(source, target) {
        const [resolvedSource, resolvedTarget] = await this.resolvePair(source, target);
        if (!resolvedSource || !resolvedTarget) {
            return "Select two clips in Premiere to run Color Match.";
        }
        const result = await this.executor.runAction("APPLY_COLOR_MATCH", {
            sourceClipId: resolvedSource,
            targetClipId: resolvedTarget
        });
        return result.success
            ? `Color match submitted to Premiere for ${resolvedTarget}.`
            : `Color match failed: ${result.error ?? result.message}`;
    }
    async applySkinToneProtection(clip) {
        const resolvedClip = await this.resolveSingleClip(clip);
        if (!resolvedClip) {
            return "Select a clip in Premiere to protect skin tones.";
        }
        const result = await this.executor.runAction("APPLY_SKIN_TONE_PROTECTION", {
            clipId: resolvedClip
        });
        return result.success
            ? `Skin-tone protection submitted to Premiere for ${resolvedClip}.`
            : `Skin-tone protection failed: ${result.error ?? result.message}`;
    }
    async applyFilmLUT(clip, lut) {
        const resolvedClip = await this.resolveSingleClip(clip);
        if (!resolvedClip) {
            return "Select a clip in Premiere before applying a LUT.";
        }
        const result = await this.executor.runAction("APPLY_FILM_LUT", {
            clipId: resolvedClip,
            lut
        });
        return result.success
            ? `Film LUT "${lut}" submitted to Premiere for ${resolvedClip}.`
            : `Film LUT failed: ${result.error ?? result.message}`;
    }
    generateLUT(description) {
        console.log(`Generating LUT based on description: "${description}"...`);
        return {
            name: `Generated LUT - ${new Date().toLocaleTimeString()}`,
            description: description,
            // In a real scenario, this would be a LUT file or data.
            data: "SIMULATED_LUT_DATA"
        };
    }
    async autoGrade(clip) {
        const resolvedClip = await this.resolveSingleClip(clip);
        if (!resolvedClip) {
            return "Select a clip in Premiere to auto-grade.";
        }
        const result = await this.executor.runAction("AUTO_GRADE", {
            clipId: resolvedClip
        });
        return result.success
            ? `Auto-grade submitted to Premiere for ${resolvedClip}.`
            : `Auto-grade failed: ${result.error ?? result.message}`;
    }
    async resolveSingleClip(clip) {
        if (clip) {
            return clip;
        }
        const selected = await this.timelineReader.getSelectedClips();
        return selected[0]?.id ?? null;
    }
    async resolvePair(source, target) {
        if (source && target) {
            return [source, target];
        }
        const selected = await this.timelineReader.getSelectedClips();
        return [source ?? selected[0]?.id ?? null, target ?? selected[1]?.id ?? null];
    }
}
exports.ColorAIEngine = ColorAIEngine;


/***/ },

/***/ 3453
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = DeveloperCenterScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const GeminiService_1 = __webpack_require__(5449);
const appInfo_1 = __webpack_require__(9476);
const AIRouter_1 = __webpack_require__(8026);
const metrics_1 = __webpack_require__(8928);
const traceStore_1 = __webpack_require__(4992);
const loggerService_1 = __webpack_require__(2954);
const systemStats_1 = __webpack_require__(1125);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const router = new AIRouter_1.AIRouter();
const LOG_FILTERS = ["all", "info", "warn", "error", "success"];
function DeveloperCenterScreen() {
    const [activeTab, setActiveTab] = (0, react_1.useState)("diagnostics");
    const [timelineMetrics, setTimelineMetrics] = (0, react_1.useState)(null);
    const [logEntries, setLogEntries] = (0, react_1.useState)(loggerService_1.loggerService.getEntries());
    const [logFilter, setLogFilter] = (0, react_1.useState)("all");
    const [selectedCallId, setSelectedCallId] = (0, react_1.useState)("");
    const [directorTrace, setDirectorTrace] = (0, react_1.useState)((0, traceStore_1.getDirectorTrace)());
    const [apiPrompt, setApiPrompt] = (0, react_1.useState)("Reply with exactly: RK Flow dev test");
    const [systemInstruction, setSystemInstruction] = (0, react_1.useState)("");
    const [apiResponse, setApiResponse] = (0, react_1.useState)("");
    const [apiStatus, setApiStatus] = (0, react_1.useState)("Developer tool only. Sends a live request through GeminiService.");
    const [apiPending, setApiPending] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        void (0, metrics_1.measureTimelineRead)().then((metrics) => {
            if (!cancelled) {
                setTimelineMetrics(metrics);
            }
        });
        const unsubscribeLogs = loggerService_1.loggerService.subscribe((entries) => {
            setLogEntries(entries);
        });
        const unsubscribeTrace = (0, traceStore_1.subscribeDirectorTrace)((entries) => {
            setDirectorTrace(entries);
        });
        return () => {
            cancelled = true;
            unsubscribeLogs();
            unsubscribeTrace();
        };
    }, []);
    const systemStats = (0, systemStats_1.getSystemStats)();
    const usageStats = (0, GeminiService_1.getGeminiUsageStats)();
    const recentCalls = (0, GeminiService_1.getRecentGeminiCalls)();
    const selectedCall = recentCalls.find((call) => call.id === selectedCallId) ?? recentCalls[0] ?? null;
    const filteredLogs = (0, react_1.useMemo)(() => logEntries.filter((entry) => logFilter === "all" || entry.severity === logFilter), [logEntries, logFilter]);
    (0, react_1.useEffect)(() => {
        if (!selectedCallId && recentCalls.length > 0) {
            setSelectedCallId(recentCalls[0].id);
        }
    }, [recentCalls, selectedCallId]);
    async function handleProviderSmokeTest() {
        setApiPending(true);
        setApiStatus("Testing provider via AIRouter...");
        try {
            const response = await router.chat({
                prompt: "Reply with exactly: RK Flow developer diagnostics OK"
            });
            setApiStatus(response.text);
        }
        catch (error) {
            setApiStatus(error instanceof Error ? error.message : "AIRouter test failed.");
        }
        finally {
            setApiPending(false);
        }
    }
    async function handleApiTest() {
        setApiPending(true);
        setApiStatus("Sending live GeminiService request...");
        setApiResponse("");
        try {
            const response = await (0, GeminiService_1.runGemini)(apiPrompt, {
                systemInstruction: systemInstruction.trim() || undefined
            });
            setApiResponse(response);
            setApiStatus("GeminiService request completed.");
        }
        catch (error) {
            setApiStatus(error instanceof Error ? error.message : "GeminiService request failed.");
        }
        finally {
            setApiPending(false);
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Developer Center", subtitle: "Diagnostics, prompt inspection, and debug tooling for Monday, August 3, 2026.", children: (0, jsx_runtime_1.jsx)(primitives_1.Tabs, { items: [
                        { id: "diagnostics", label: "Diagnostics" },
                        { id: "logs", label: "Logs" },
                        { id: "prompts", label: "Prompt Builder" },
                        { id: "debugger", label: "AI Debugger" },
                        { id: "api", label: "API Tester" }
                    ], active: activeTab, onChange: setActiveTab }) }), activeTab === "diagnostics" && ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Environment", subtitle: "Real runtime facts from the current panel bridge.", style: { flex: "1 1 320px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Provider Gemini", tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Model ${GeminiService_1.GEMINI_MODEL}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Plugin ${appInfo_1.APP_VERSION}` })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexDirection: "column", gap: theme_1.spacing.sm, color: theme_1.colors.inkMuted }, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Premiere bridge: ", timelineMetrics?.timeline ? "Connected" : "No active sequence or bridge response yet"] }), (0, jsx_runtime_1.jsx)("div", { children: "Premiere version: Unavailable in this panel bridge" }), (0, jsx_runtime_1.jsx)("div", { children: "Premiere build: Unavailable in this panel bridge" }), (0, jsx_runtime_1.jsxs)("div", { children: ["GPU: ", systemStats.gpu] }), (0, jsx_runtime_1.jsxs)("div", { children: ["RAM: ", systemStats.ram] })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void handleProviderSmokeTest(), disabled: apiPending, children: "Test AIRouter Provider" }) })] }), (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Performance Monitor", subtitle: "Reuses the same Module 4 analytics sources.", style: { flex: "1 1 320px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${usageStats.totalCalls} Gemini calls` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Avg ${usageStats.averageDurationMs} ms` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Timeline ${timelineMetrics ? `${timelineMetrics.latencyMs} ms` : "—"}`, tone: timelineMetrics?.error ? "warning" : "success" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexDirection: "column", gap: theme_1.spacing.sm, color: theme_1.colors.inkMuted }, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Sequence: ", timelineMetrics?.timeline?.sequenceName || "No active sequence"] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Clips scanned: ", timelineMetrics?.clipCount ?? 0] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Failures: ", usageStats.failedCalls] }), timelineMetrics?.error && (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.warning }, children: timelineMetrics.error })] })] })] })), activeTab === "logs" && ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Logs Viewer", subtitle: "Shared logger service entries, filterable by severity.", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", marginBottom: theme_1.spacing.md }, children: [LOG_FILTERS.map((filter) => ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: logFilter === filter ? "primary" : "secondary", onClick: () => setLogFilter(filter), children: filter.toUpperCase() }, filter))), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: () => loggerService_1.loggerService.clear(), children: "Clear Logs" })] }), (0, jsx_runtime_1.jsx)("div", { style: panelStyle, children: filteredLogs.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "No shared log entries captured yet." })) : (filteredLogs.slice().reverse().map((entry) => ((0, jsx_runtime_1.jsxs)("div", { style: { paddingBottom: theme_1.spacing.sm, borderBottom: `1px solid ${theme_1.colors.border}` }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)("strong", { style: { color: theme_1.colors.maroonDeep }, children: entry.severity.toUpperCase() }), (0, jsx_runtime_1.jsx)("span", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.xs }, children: entry.timestamp })] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.ink, marginTop: 4 }, children: entry.message })] }, entry.id)))) })] })), activeTab === "prompts" && ((0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Prompt Builder", subtitle: "Exact GeminiService prompt payloads from recent recorded calls.", children: recentCalls.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "No GeminiService calls are recorded in this session yet." })) : ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)("select", { value: selectedCall?.id ?? "", onChange: (event) => setSelectedCallId(event.target.value), style: selectStyle, children: recentCalls.map((call) => ((0, jsx_runtime_1.jsxs)("option", { value: call.id, children: [new Date(call.startedAt).toLocaleTimeString(), " \u2022 ", call.kind, " \u2022 ", call.model] }, call.id))) }), selectedCall && ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: "1 1 320px" }, children: [(0, jsx_runtime_1.jsx)("div", { style: sectionLabelStyle, children: "Exact Prompt" }), (0, jsx_runtime_1.jsx)("pre", { style: panelStyle, children: selectedCall.promptText })] }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: "1 1 320px" }, children: [(0, jsx_runtime_1.jsx)("div", { style: sectionLabelStyle, children: "Response" }), (0, jsx_runtime_1.jsx)("pre", { style: panelStyle, children: selectedCall.responseText || selectedCall.errorMessage || "No response body stored." })] })] }))] })) })), activeTab === "debugger" && ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "AI Debugger", subtitle: "The same live AI Director step-log stream used by the feature screen.", children: [(0, jsx_runtime_1.jsx)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", marginBottom: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${directorTrace.length} steps` }) }), (0, jsx_runtime_1.jsx)("div", { style: panelStyle, children: directorTrace.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "Run AI Director to populate the shared reasoning trace." })) : (directorTrace.map((entry, index) => ((0, jsx_runtime_1.jsx)("pre", { style: preStyle, children: entry }, `${index}-${entry.slice(0, 16)}`)))) })] })), activeTab === "api" && ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "API Testing Panel", subtitle: "Developer-only raw GeminiService probe. This is not user-facing workflow UI.", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", marginBottom: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Dev Tool", tone: "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Model ${GeminiService_1.GEMINI_MODEL}` })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Input, { multiline: true, rows: 3, value: systemInstruction, onChange: (event) => setSystemInstruction(event.target.value), placeholder: "Optional system instruction" }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { multiline: true, rows: 6, value: apiPrompt, onChange: (event) => setApiPrompt(event.target.value), placeholder: "Prompt to send through GeminiService" }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void handleApiTest(), disabled: apiPending || !apiPrompt.trim(), children: apiPending ? "Running..." : "Send Raw Prompt" }) }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: apiStatus }), (0, jsx_runtime_1.jsx)("pre", { style: panelStyle, children: apiResponse || "No response yet." })] })] }))] }));
}
const panelStyle = {
    maxHeight: 360,
    overflow: "auto",
    borderRadius: 10,
    border: `1px solid ${theme_1.colors.border}`,
    background: theme_1.colors.white,
    padding: theme_1.spacing.sm,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
};
const preStyle = {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
};
const sectionLabelStyle = {
    color: theme_1.colors.maroonDeep,
    fontWeight: 700,
    marginBottom: theme_1.spacing.xs
};
const selectStyle = {
    width: "100%",
    boxSizing: "border-box",
    borderRadius: 10,
    border: `1px solid ${theme_1.colors.border}`,
    background: theme_1.colors.white,
    color: theme_1.colors.ink,
    padding: "10px 12px"
};


/***/ },

/***/ 6175
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = EmotionAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const ClipGrid_1 = __importDefault(__webpack_require__(1820));
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const perceptionAnalyzers_1 = __webpack_require__(990);
const useSequenceAnalysis_1 = __webpack_require__(8936);
function EmotionAIScreen() {
    const [filter, setFilter] = (0, react_1.useState)("all");
    const { context, result, loading, progress, error, reanalyze } = (0, useSequenceAnalysis_1.useSequenceAnalysis)({
        moduleId: "emotion-ai",
        analyze: perceptionAnalyzers_1.analyzeEmotions
    });
    const tags = (0, react_1.useMemo)(() => Array.from(new Set((result?.clips ?? []).flatMap((clip) => clip.emotions))), [result?.clips]);
    const items = (result?.clips ?? [])
        .filter((clip) => filter === "all" || clip.emotions.includes(filter))
        .map((clip) => ({
        id: clip.clipId,
        title: clip.clipName,
        subtitle: clip.source,
        badges: [clip.source === "visual" ? "Visual" : "Metadata-only", ...clip.emotions],
        detail: `${(clip.confidence * 100).toFixed(0)}% confidence`
    }));
    if (!context) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Emotion AI", children: "Open a sequence to analyze." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Emotion AI", subtitle: result?.source ?? "Metadata-only emotion inference", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setFilter("all"), style: chipButton(filter === "all"), children: "All" }), tags.map((tag) => ((0, jsx_runtime_1.jsx)("button", { onClick: () => setFilter(tag), style: chipButton(filter === tag), children: tag }, tag)))] }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void reanalyze(), disabled: loading, children: "Re-analyze" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [loading && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progress.percent, label: `${progress.completed}/${progress.total} clips` }), (0, jsx_runtime_1.jsx)("div", { style: { color: error ? theme_1.colors.danger : theme_1.colors.inkMuted }, children: error || progress.label })] })] }), (0, jsx_runtime_1.jsx)(ClipGrid_1.default, { items: items, emptyLabel: "No clips matched the selected emotion filter." })] }));
}
function chipButton(active) {
    return {
        borderRadius: 999,
        border: `1px solid ${active ? theme_1.colors.gold : theme_1.colors.border}`,
        background: active ? theme_1.colors.panelMuted : theme_1.colors.white,
        color: active ? theme_1.colors.maroonDeep : theme_1.colors.ink,
        padding: "6px 10px",
        cursor: "pointer"
    };
}


/***/ },

/***/ 2503
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.inspectExportCapability = inspectExportCapability;
exports.buildOutputName = buildOutputName;
exports.createQueueItem = createQueueItem;
const PremiereAPI_1 = __webpack_require__(868);
async function inspectExportCapability() {
    try {
        const sequence = await PremiereAPI_1.premiereAPI.getActiveSequence();
        const missing = [];
        if (!sequence) {
            missing.push("No active sequence");
        }
        if (!sequence?.exportAsMediaDirect) {
            missing.push("sequence.exportAsMediaDirect");
        }
        if (!sequence?.getExportFileExtension) {
            missing.push("sequence.getExportFileExtension");
        }
        if (missing.length > 0) {
            return {
                canAttemptDirectExport: false,
                missing,
                note: "This workspace has no verified preset-discovery path wired into the panel runtime yet. Export AI will prepare a Media Encoder hand-off instead of pretending a one-click export is confirmed."
            };
        }
        return {
            canAttemptDirectExport: true,
            missing: [],
            note: "Premiere reports a direct export API surface, but this repo has not manually re-verified an end-to-end delivery export from the panel in the current session."
        };
    }
    catch (error) {
        return {
            canAttemptDirectExport: false,
            missing: ["Premiere capability inspection failed"],
            note: error instanceof Error ? error.message : "Could not inspect export capability."
        };
    }
}
function buildOutputName(sequenceName, presetLabel, template) {
    const today = new Date();
    const date = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
    return template
        .replaceAll("{sequenceName}", sanitize(sequenceName || "Sequence"))
        .replaceAll("{preset}", sanitize(presetLabel))
        .replaceAll("{date}", date);
}
function createQueueItem(args) {
    const handoff = !args.capability.canAttemptDirectExport;
    return {
        id: `${Date.now()}-${args.preset.id}`,
        presetId: args.preset.id,
        presetLabel: args.preset.label,
        outputName: args.outputName,
        destination: args.destination,
        status: handoff ? "handoff" : "queued",
        detail: handoff
            ? "Prepared for Premiere's native Media Encoder hand-off."
            : "Direct export API detected, but still awaiting manual verification and preset wiring.",
        createdAt: new Date().toISOString()
    };
}
function sanitize(value) {
    return value.replace(/[^\w.-]+/g, "_");
}


/***/ },

/***/ 3254
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = ExportAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const premiereService_1 = __webpack_require__(3763);
const exportService_1 = __webpack_require__(2503);
const presets_1 = __webpack_require__(2550);
const DEFAULT_TEMPLATE = "{sequenceName}_{preset}_{date}";
function ExportAIScreen() {
    const [selectedPresetId, setSelectedPresetId] = (0, react_1.useState)(presets_1.EXPORT_PRESETS[0].id);
    const [template, setTemplate] = (0, react_1.useState)(DEFAULT_TEMPLATE);
    const [destination, setDestination] = (0, react_1.useState)("/exports");
    const [queue, setQueue] = (0, react_1.useState)([]);
    const [capability, setCapability] = (0, react_1.useState)(null);
    const [timelineName, setTimelineName] = (0, react_1.useState)("Sequence");
    (0, react_1.useEffect)(() => {
        void (0, exportService_1.inspectExportCapability)().then(setCapability);
        void premiereService_1.premiereService.getTimelineInfo().then((info) => {
            setTimelineName(info.sequenceName || "Sequence");
        });
    }, []);
    const preset = (0, react_1.useMemo)(() => presets_1.EXPORT_PRESETS.find((item) => item.id === selectedPresetId) ?? presets_1.EXPORT_PRESETS[0], [selectedPresetId]);
    const outputName = (0, exportService_1.buildOutputName)(timelineName, preset.label, template);
    function queueExport() {
        const next = (0, exportService_1.createQueueItem)({
            preset,
            outputName,
            destination,
            capability: capability ?? {
                canAttemptDirectExport: false,
                missing: ["Capability check still loading"],
                note: "Capability inspection is still loading; queueing as Media Encoder hand-off."
            }
        });
        setQueue((current) => [next, ...current]);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Export AI", subtitle: "Delivery presets, naming templates, and an honest export hand-off queue.", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: "1 1 280px", display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "export-preset", style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: "Delivery preset" }), (0, jsx_runtime_1.jsx)("select", { id: "export-preset", value: selectedPresetId, onChange: (event) => setSelectedPresetId(event.target.value), style: {
                                            width: "100%",
                                            boxSizing: "border-box",
                                            borderRadius: 10,
                                            border: `1px solid ${theme_1.colors.border}`,
                                            background: theme_1.colors.white,
                                            color: theme_1.colors.ink,
                                            padding: "10px 12px"
                                        }, children: presets_1.EXPORT_PRESETS.map((item) => ((0, jsx_runtime_1.jsx)("option", { value: item.id, children: item.label }, item.id))) }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: [preset.resolution, " \u2022 ", preset.aspectRatio, " \u2022 ", preset.targetBitrate, " \u2022 ", preset.format] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.sm }, children: preset.notes })] }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: "1 1 320px", display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "export-template", style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: "Naming template" }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { id: "export-template", value: template, onChange: (event) => setTemplate(event.target.value) }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "export-destination", style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: "Destination folder" }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { id: "export-destination", value: destination, onChange: (event) => setDestination(event.target.value) }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: ["Output name preview: ", (0, jsx_runtime_1.jsx)("strong", { children: outputName })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: capability?.canAttemptDirectExport
                                    ? "Direct export API detected"
                                    : "Media Encoder hand-off only", tone: capability?.canAttemptDirectExport ? "warning" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: queueExport, children: "Add To Export Queue" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted }, children: capability?.note ?? "Inspecting Premiere export capability..." }), capability && capability.missing.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.xs, color: theme_1.colors.warning }, children: ["Missing or unverified host surface: ", capability.missing.join(", ")] }))] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Export Queue", subtitle: "Queue state is real UI. Final rendering still depends on Premiere's native export path.", children: queue.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "Queue a delivery preset to prepare the export hand-off." })) : ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: queue.map((item) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                            border: `1px solid ${theme_1.colors.border}`,
                            borderRadius: 10,
                            background: theme_1.colors.white,
                            padding: theme_1.spacing.sm
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: item.outputName }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: [item.presetLabel, " \u2022 ", item.destination] })] }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: statusLabel(item.status), tone: item.status === "failed" ? "danger" : item.status === "submitted" ? "success" : "warning" })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.sm, color: theme_1.colors.inkMuted }, children: item.detail })] }, item.id))) })) })] }));
}
function statusLabel(status) {
    switch (status) {
        case "handoff":
            return "Ready for Media Encoder";
        case "queued":
            return "Queued";
        case "submitted":
            return "Submitted";
        case "failed":
            return "Failed";
        default:
            return status;
    }
}


/***/ },

/***/ 2550
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.EXPORT_PRESETS = void 0;
exports.EXPORT_PRESETS = [
    {
        id: "instagram-reel",
        label: "Instagram Reel",
        resolution: "1080x1920",
        aspectRatio: "9:16",
        targetBitrate: "10-16 Mbps",
        format: "H.264 MP4",
        notes: "Vertical social delivery with compact bitrate for fast upload."
    },
    {
        id: "youtube-shorts",
        label: "YouTube Shorts",
        resolution: "1080x1920",
        aspectRatio: "9:16",
        targetBitrate: "12-20 Mbps",
        format: "H.264 MP4",
        notes: "Vertical short-form preset for YouTube mobile playback."
    },
    {
        id: "youtube-highlight",
        label: "YouTube Highlight",
        resolution: "1920x1080",
        aspectRatio: "16:9",
        targetBitrate: "16-30 Mbps",
        format: "H.264 MP4",
        notes: "Standard highlight export for long-form wedding edits."
    },
    {
        id: "facebook",
        label: "Facebook",
        resolution: "1920x1080",
        aspectRatio: "16:9",
        targetBitrate: "10-18 Mbps",
        format: "H.264 MP4",
        notes: "Balanced delivery for Facebook feed playback."
    },
    {
        id: "whatsapp",
        label: "WhatsApp",
        resolution: "1280x720",
        aspectRatio: "16:9",
        targetBitrate: "4-8 Mbps",
        format: "H.264 MP4",
        notes: "Mobile-friendly compressed export for direct sharing."
    },
    {
        id: "master-export",
        label: "Master Export",
        resolution: "Sequence Native",
        aspectRatio: "Sequence Native",
        targetBitrate: "High / mezzanine",
        format: "ProRes / DNx / H.264 depending on editor preset",
        notes: "Archive-quality delivery. Requires an explicit Premiere export preset."
    }
];


/***/ },

/***/ 9209
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = FaceAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const brain_1 = __webpack_require__(7021);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const perceptionAnalyzers_1 = __webpack_require__(990);
const useSequenceAnalysis_1 = __webpack_require__(8936);
const memory = new brain_1.MemoryEngine();
function FaceAIScreen() {
    const [filter, setFilter] = (0, react_1.useState)("");
    const { context, result, loading, progress, error, reanalyze } = (0, useSequenceAnalysis_1.useSequenceAnalysis)({
        moduleId: "face-ai",
        analyze: perceptionAnalyzers_1.analyzeFaceClusters
    });
    const sequenceKey = context?.sequenceKey ?? "";
    const clusters = (0, react_1.useMemo)(() => {
        const list = result?.clusters ?? [];
        return list.filter((cluster) => cluster.label.toLowerCase().includes(filter.toLowerCase()));
    }, [filter, result?.clusters]);
    if (!context) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Face AI", children: "Open a sequence to analyze." });
    }
    function renameCluster(cluster) {
        const next = window.prompt("Rename cluster", cluster.label);
        if (!next || !result) {
            return;
        }
        const updated = result.clusters.map((item) => item.id === cluster.id ? { ...item, label: next.trim() } : item);
        memory.setAnalysis(`face-ai:${sequenceKey}`, "result", {
            ...result,
            clusters: updated
        });
        window.location.reload();
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Face AI", subtitle: result?.source ?? "Metadata-only clustering fallback", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Input, { placeholder: "Search person", value: filter, onChange: (event) => setFilter(event.target.value), style: { maxWidth: 280 } }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void reanalyze(), disabled: loading, children: "Re-analyze" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [loading && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progress.percent, label: `${progress.completed}/${progress.total} clips` }), (0, jsx_runtime_1.jsx)("div", { style: { color: error ? theme_1.colors.danger : theme_1.colors.inkMuted }, children: error || progress.label })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md }, children: clusters.map((cluster) => ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: cluster.label, subtitle: `Role: ${cluster.role}`, style: { flex: "1 1 240px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: cluster.source === "visual" ? "Visual" : "Metadata-only", tone: cluster.source === "visual" ? "success" : "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${(cluster.confidence * 100).toFixed(0)}%` }), cluster.emotionTags.map((tag) => ((0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: tag }, tag)))] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted }, children: ["Appears in ", cluster.clipIds.length, " selected clips."] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: () => renameCluster(cluster), children: "Rename Cluster" }) })] }, cluster.id))) })] }));
}


/***/ },

/***/ 3426
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.LearnStyleEngine = void 0;
const MemoryEngine_1 = __webpack_require__(1700);
class LearnStyleEngine {
    memory;
    constructor() {
        this.memory = new MemoryEngine_1.MemoryEngine();
    }
    learn(sequenceName, styleProfileName) {
        console.log(`Analyzing sequence: ${sequenceName} to learn style and save as '${styleProfileName}'...`);
        // Simulate analyzing a sequence.
        // In a real scenario, this would involve deep analysis of the sequence.
        const learnedStyle = {
            cutTiming: "Aggressive, with frequent jump cuts",
            musicChoice: "High-energy electronic, synced to action",
            transitions: "Whip pans and quick zooms",
            colorGrade: "High contrast, saturated, with a slight cool tint",
            sfx: "Impact sounds and risers on key moments",
            zoomHabits: "Slow push-ins on emotional moments",
            titlingStyle: "Bold, sans-serif, lower-third titles",
            learnedFrom: sequenceName,
            createdAt: new Date().toISOString()
        };
        this.memory.setAnalysis("learn-style", styleProfileName, learnedStyle);
        console.log(`Style profile '${styleProfileName}' saved to MemoryEngine.`);
        return learnedStyle;
    }
    getStyleProfiles() {
        const allAnalysis = this.memory.load().analysis;
        const styleProfiles = {};
        for (const key in allAnalysis) {
            if (key.startsWith("learn-style::")) {
                const profileName = key.replace("learn-style::", "");
                styleProfiles[profileName] = allAnalysis[key];
            }
        }
        return styleProfiles;
    }
}
exports.LearnStyleEngine = LearnStyleEngine;


/***/ },

/***/ 1842
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.MotionAIEngine = void 0;
const PremiereExecutor_1 = __webpack_require__(7365);
const PremiereBridge_1 = __webpack_require__(1862);
const TimelineReader_1 = __webpack_require__(824);
class MotionAIEngine {
    executor = new PremiereExecutor_1.PremiereExecutor();
    timelineReader = new TimelineReader_1.TimelineReader(new PremiereBridge_1.PremiereBridge());
    async applyPanAndZoom(clip, preset) {
        const resolvedClip = await this.resolveSingleClip(clip);
        if (!resolvedClip) {
            return "Select a clip in Premiere before applying Pan & Zoom.";
        }
        const result = await this.executor.runAction("APPLY_PAN_AND_ZOOM", {
            clipId: resolvedClip,
            preset
        });
        return result.success
            ? `Pan and zoom submitted to Premiere for ${resolvedClip}.`
            : `Pan and zoom failed: ${result.error ?? result.message}`;
    }
    async applyParallax(clip) {
        const resolvedClip = await this.resolveSingleClip(clip);
        if (!resolvedClip) {
            return "Select a clip in Premiere before applying Parallax.";
        }
        const result = await this.executor.runAction("APPLY_PARALLAX", {
            clipId: resolvedClip
        });
        return result.success
            ? `Parallax submitted to Premiere for ${resolvedClip}.`
            : `Parallax failed: ${result.error ?? result.message}`;
    }
    async applyMotionBlur(clip, amount) {
        const resolvedClip = await this.resolveSingleClip(clip);
        if (!resolvedClip) {
            return "Select a clip in Premiere before applying Motion Blur.";
        }
        const result = await this.executor.runAction("APPLY_MOTION_BLUR", {
            clipId: resolvedClip,
            amount
        });
        return result.success
            ? `Motion blur submitted to Premiere for ${resolvedClip}.`
            : `Motion blur failed: ${result.error ?? result.message}`;
    }
    async resolveSingleClip(clip) {
        if (clip) {
            return clip;
        }
        const selected = await this.timelineReader.getSelectedClips();
        return selected[0]?.id ?? null;
    }
}
exports.MotionAIEngine = MotionAIEngine;


/***/ },

/***/ 6609
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = MusicAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const musicAnalysisCache_1 = __webpack_require__(4262);
function MusicAIScreen() {
    const [analysis, setAnalysis] = (0, react_1.useState)(null);
    const [progress, setProgress] = (0, react_1.useState)("Select a song file to analyze.");
    const [progressPercent, setProgressPercent] = (0, react_1.useState)(0);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const chartPoints = (0, react_1.useMemo)(() => {
        if (!analysis || analysis.energyCurve.length === 0) {
            return "";
        }
        return analysis.energyCurve
            .map((value, index) => {
            const x = (index / Math.max(analysis.energyCurve.length - 1, 1)) * 100;
            const y = 40 - value * 34;
            return `${x},${Math.max(4, y)}`;
        })
            .join(" ");
    }, [analysis]);
    async function onFileChange(file) {
        if (!file) {
            return;
        }
        setLoading(true);
        setProgress("Reading audio file...");
        setProgressPercent(10);
        try {
            const result = await (0, musicAnalysisCache_1.analyzeAndCacheMusicFile)(file, (next) => {
                setProgress(next.label);
                if (next.percent !== undefined) {
                    setProgressPercent(next.percent);
                }
            });
            setAnalysis(result);
            setProgress("Music analysis complete.");
            setProgressPercent(100);
        }
        catch (error) {
            setProgress(error instanceof Error ? error.message : "Could not analyze the song.");
            setProgressPercent(0);
        }
        finally {
            setLoading(false);
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Music AI", subtitle: analysis?.source ?? "Audio-signal analysis", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.md, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: "audio/*", onChange: (event) => void onFileChange(event.target.files?.[0] ?? null) }), analysis && (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${analysis.bpm} BPM`, tone: "success" })] }), loading && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progressPercent, label: `${progressPercent}%` }) })), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted }, children: loading ? "Analyzing..." : progress })] }), analysis && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: analysis.fileName, subtitle: `${analysis.genre} • ${analysis.mood}`, children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 40", style: { width: "100%", height: 120, background: theme_1.colors.white, borderRadius: 10 }, children: [(0, jsx_runtime_1.jsx)("polyline", { fill: "none", stroke: theme_1.colors.maroon, strokeWidth: "1.4", points: chartPoints }), analysis.beatPositions.map((beat, index) => ((0, jsx_runtime_1.jsx)("line", { x1: (beat / Math.max(analysis.sections[analysis.sections.length - 1]?.end || 1, 1)) * 100, x2: (beat / Math.max(analysis.sections[analysis.sections.length - 1]?.end || 1, 1)) * 100, y1: "0", y2: "40", stroke: theme_1.colors.gold, strokeWidth: "0.5" }, `${beat}-${index}`)))] }) }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Sections", children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: analysis.sections.map((section) => ((0, jsx_runtime_1.jsxs)("div", { style: { padding: theme_1.spacing.sm, borderRadius: 10, border: `1px solid ${theme_1.colors.border}` }, children: [section.label, ": ", section.start.toFixed(1), "s - ", section.end.toFixed(1), "s"] }, section.id))) }) })] }))] }));
}


/***/ },

/***/ 4262
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.listCachedMusicAnalyses = listCachedMusicAnalyses;
exports.analyzeAndCacheMusicFile = analyzeAndCacheMusicFile;
const brain_1 = __webpack_require__(7021);
const perceptionAnalyzers_1 = __webpack_require__(990);
const memory = new brain_1.MemoryEngine();
const MUSIC_CACHE_PREFIX = "music-ai:file:";
function listCachedMusicAnalyses() {
    return Object.entries(memory.load().analysis)
        .filter(([key, value]) => key.startsWith(MUSIC_CACHE_PREFIX) && isMusicAnalysis(value))
        .map(([, value]) => value)
        .sort((left, right) => left.fileName.localeCompare(right.fileName));
}
async function analyzeAndCacheMusicFile(file, onProgress) {
    const hash = await hashFile(file);
    const cached = memory.getAnalysis(`${MUSIC_CACHE_PREFIX}${hash}`, "result");
    if (cached) {
        onProgress({ label: "Loaded cached song analysis.", percent: 100 });
        return cached;
    }
    onProgress({ label: "Reading audio file...", percent: 10 });
    const context = new AudioContext();
    try {
        const buffer = await file.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(buffer.slice(0));
        const result = await (0, perceptionAnalyzers_1.analyzeMusicFile)(file, audioBuffer, (next) => {
            if (typeof next === "string") {
                onProgress({ label: next });
                return;
            }
            onProgress({ label: next.label, percent: next.percent });
        });
        memory.setAnalysis(`${MUSIC_CACHE_PREFIX}${result.fileHash}`, "result", result);
        return result;
    }
    finally {
        await context.close?.();
    }
}
function isMusicAnalysis(value) {
    return Boolean(value &&
        typeof value === "object" &&
        typeof value.fileHash === "string" &&
        typeof value.fileName === "string" &&
        Array.isArray(value.energyCurve));
}
async function hashFile(file) {
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(digest))
        .slice(0, 12)
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("");
}


/***/ },

/***/ 990
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.analyzeWeddingSegments = analyzeWeddingSegments;
exports.analyzeFaceClusters = analyzeFaceClusters;
exports.analyzeEmotions = analyzeEmotions;
exports.analyzeCamera = analyzeCamera;
exports.analyzeClipIntelligence = analyzeClipIntelligence;
exports.analyzeTimelineHealth = analyzeTimelineHealth;
exports.analyzeMusicFile = analyzeMusicFile;
const GeminiService_1 = __webpack_require__(5449);
const schemas_1 = __webpack_require__(8156);
const FrameExtractor_1 = __webpack_require__(8442);
const perceptionUtils_1 = __webpack_require__(6680);
async function analyzeWeddingSegments(context, onProgress) {
    const clips = context.selectedClips;
    if (clips.length === 0) {
        return {
            segments: [],
            source: (0, perceptionUtils_1.signalSourceLabel)("metadata")
        };
    }
    const results = await (0, perceptionUtils_1.runBatchedGemini)({
        clips,
        batchSize: 12,
        onProgress: ({ completed, total, label }) => onProgress({ completed, total, label: `${label} for Wedding AI` }),
        buildPrompt: (batch) => [
            "Classify Indian wedding event segments from timeline metadata only.",
            "Return JSON array with: id, label, confidence, start, end, source.",
            "Allowed labels: Haldi, Mehndi, Sangeet, Baraat, Bride Entry, Groom Entry, Varmala, Pheras, Sindoor, Mangalsutra, Vidaai, Reception, Engagement, Ring Ceremony, Unknown.",
            (0, perceptionUtils_1.buildClipPrompt)(batch)
        ].join("\n\n"),
        responseSchema: schemas_1.weddingSegmentsSchema,
        parse: (text) => (0, perceptionUtils_1.normalizeJson)(text, []).map((item) => normalizeWeddingSegment(item))
    });
    return {
        segments: results.sort((left, right) => left.start - right.start),
        source: (0, perceptionUtils_1.signalSourceLabel)("metadata")
    };
}
function normalizeWeddingSegment(item) {
    return {
        ...item,
        start: normalizeTimingValue(item.start, `${item.id}:start`),
        end: normalizeTimingValue(item.end, `${item.id}:end`),
        source: (0, perceptionUtils_1.signalSourceLabel)("metadata")
    };
}
function normalizeTimingValue(value, label) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === "string") {
        const parsed = parseTimingString(value);
        if (parsed !== null) {
            logTimingNormalization(value, label, parsed);
            return parsed;
        }
    }
    if (value && typeof value === "object") {
        const seconds = parsePrimitiveNumber(value.seconds);
        if (seconds !== null) {
            logTimingNormalization(value, label, seconds);
            return seconds;
        }
        const ticksNumber = parsePrimitiveNumber(value.ticksNumber);
        if (ticksNumber !== null) {
            const normalized = ticksNumber / 254016000000;
            logTimingNormalization(value, label, normalized);
            return normalized;
        }
        const ticks = parsePrimitiveNumber(value.ticks);
        if (ticks !== null) {
            const normalized = ticks / 254016000000;
            logTimingNormalization(value, label, normalized);
            return normalized;
        }
    }
    console.warn("[RK Flow] WeddingSegment received invalid timing value.", {
        field: label,
        type: typeof value,
        value
    });
    return 0;
}
function parseTimingString(value) {
    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }
    const direct = Number(trimmed);
    if (Number.isFinite(direct)) {
        return direct;
    }
    if (trimmed.endsWith("s")) {
        const secondsValue = Number.parseFloat(trimmed.slice(0, -1).trim());
        if (Number.isFinite(secondsValue)) {
            return secondsValue;
        }
    }
    const parts = trimmed.split(":").map((part) => Number(part));
    if (parts.some((part) => Number.isNaN(part))) {
        return null;
    }
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }
    return null;
}
function parsePrimitiveNumber(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
}
function logTimingNormalization(value, label, normalized) {
    console.warn("[RK Flow] Normalized WeddingSegment timing.", {
        field: label,
        type: typeof value,
        value,
        normalizedSeconds: normalized
    });
}
async function analyzeFaceClusters(context, onProgress) {
    const clips = context.selectedClips;
    const visualSummaries = await analyzeVisualPersonBatch(context, clips, onProgress);
    const fallbackClusters = await (0, perceptionUtils_1.runBatchedGemini)({
        clips: visualSummaries.metadataOnly,
        batchSize: 10,
        onProgress: ({ completed, total, label }) => onProgress({ completed, total, label: `${label} for Face AI metadata fallback` }),
        buildPrompt: (batch) => [
            "Infer people clusters from clip metadata only. Return JSON array with: id, label, role, confidence, clipIds, emotionTags, source.",
            "Roles: bride, groom, family, guest, unknown.",
            (0, perceptionUtils_1.buildClipPrompt)(batch)
        ].join("\n\n"),
        responseSchema: schemas_1.faceClustersSchema,
        parse: (text) => (0, perceptionUtils_1.normalizeJson)(text, []).map((item) => ({
            ...item,
            source: (0, perceptionUtils_1.signalSourceLabel)("metadata")
        }))
    });
    const clusters = [
        ...aggregateClusters(visualSummaries.visual),
        ...fallbackClusters
    ];
    return {
        clusters,
        source: visualSummaries.visual.length > 0
            ? "visual frame samples + metadata fallback"
            : (0, perceptionUtils_1.signalSourceLabel)("metadata")
    };
}
async function analyzeEmotions(context, onProgress) {
    const visual = await analyzeVisualEmotionBatch(context, context.selectedClips, onProgress);
    const fallback = await (0, perceptionUtils_1.runBatchedGemini)({
        clips: visual.metadataOnly,
        batchSize: 12,
        onProgress: ({ completed, total, label }) => onProgress({ completed, total, label: `${label} for Emotion AI metadata fallback` }),
        buildPrompt: (batch) => [
            "Classify clip emotions from timeline metadata only. Multiple tags allowed.",
            "Return JSON array with: clipId, clipName, emotions, confidence, source.",
            "Emotion tags: smile, cry, laugh, hug, dance, reaction.",
            (0, perceptionUtils_1.buildClipPrompt)(batch)
        ].join("\n\n"),
        responseSchema: schemas_1.emotionClipsSchema,
        parse: (text) => (0, perceptionUtils_1.normalizeJson)(text, []).map((item) => ({
            ...item,
            source: (0, perceptionUtils_1.signalSourceLabel)("metadata")
        }))
    });
    const results = [...visual.visual, ...fallback];
    return {
        clips: results,
        source: visual.visual.length > 0
            ? "visual frame samples + metadata fallback"
            : (0, perceptionUtils_1.signalSourceLabel)("metadata")
    };
}
async function analyzeCamera(context, onProgress) {
    const visual = await analyzeVisualCameraBatch(context, context.selectedClips, onProgress);
    const fallback = await (0, perceptionUtils_1.runBatchedGemini)({
        clips: visual.metadataOnly,
        batchSize: 12,
        onProgress: ({ completed, total, label }) => onProgress({ completed, total, label: `${label} for Camera AI metadata fallback` }),
        buildPrompt: (batch) => [
            "Infer shot type and movement from clip metadata only.",
            "Return JSON array with: clipId, clipName, shotType, movement, confidence, source.",
            "Shot types: drone, gimbal, handheld, tripod, wide, close, detail.",
            "Movement: static, pan, tilt, push, pull, unknown.",
            (0, perceptionUtils_1.buildClipPrompt)(batch)
        ].join("\n\n"),
        responseSchema: schemas_1.cameraClipsSchema,
        parse: (text) => (0, perceptionUtils_1.normalizeJson)(text, []).map((item) => ({
            ...item,
            source: (0, perceptionUtils_1.signalSourceLabel)("metadata")
        }))
    });
    const results = [...visual.visual, ...fallback];
    return {
        clips: results,
        source: visual.visual.length > 0
            ? "visual frame samples + metadata fallback"
            : (0, perceptionUtils_1.signalSourceLabel)("metadata")
    };
}
async function analyzeClipIntelligence(context, onProgress) {
    onProgress({
        label: "Extracting sample frames for clip intelligence...",
        completed: 0,
        total: Math.max(context.selectedClips.length, 1)
    });
    const scores = await analyzeClipTechnicalScores(context, onProgress);
    return {
        clips: scores.sort((left, right) => right.aiRating - left.aiRating),
        formula: "AI Rating = blur 22% + focus 22% + noise 16% + exposure 20% + white balance 20%",
        source: "metadata-derived fallback (frame extraction unavailable in current Premiere bridge)"
    };
}
async function analyzeTimelineHealth(context, clipScores, onProgress) {
    onProgress({ label: "Computing timeline health...", completed: 0, total: 1, percent: 0 });
    const sorted = [...context.selectedClips].sort((left, right) => left.start - right.start);
    let gapSeconds = 0;
    const gaps = [];
    for (let index = 1; index < sorted.length; index += 1) {
        const previous = sorted[index - 1];
        const current = sorted[index];
        const gap = current.start - previous.end;
        if (gap > 0.1) {
            gapSeconds += gap;
            gaps.push({ start: previous.end, end: current.start });
        }
    }
    const duplicates = clipScores?.filter((clip) => clip.duplicateGroup !== null).length ?? 0;
    const averageDuration = sorted.reduce((sum, clip) => sum + clip.duration, 0) / Math.max(sorted.length, 1);
    const variance = sorted.reduce((sum, clip) => sum + Math.abs(clip.duration - averageDuration), 0) /
        Math.max(sorted.length, 1);
    const score = Math.max(0, Math.round(100 - gaps.length * 8 - gapSeconds * 4 - duplicates * 5 - variance * 3));
    const issues = [];
    if (gaps.length > 0) {
        issues.push({
            id: "gaps",
            title: "Timeline gaps detected",
            detail: `${gaps.length} gaps totaling ${gapSeconds.toFixed(1)}s`,
            metric: `${gaps.length} gaps`,
            payload: gaps,
        });
    }
    if (duplicates > 0) {
        issues.push({
            id: "duplicates",
            title: "Duplicate clip names found",
            detail: `${duplicates} clips share duplicate names or repeated placements.`,
            metric: `${duplicates} duplicate clips`
        });
    }
    issues.push({
        id: "variance",
        title: "Clip length variance",
        detail: `Average clip variance is ${variance.toFixed(2)} seconds.`,
        metric: `${variance.toFixed(2)}s variance`
    });
    return {
        score,
        formula: "100 - (gap count × 8) - (gap seconds × 4) - (duplicate clips × 5) - (avg clip variance × 3)",
        issues,
        source: "timeline timings + cached clip intelligence"
    };
}
async function analyzeMusicFile(file, audioBuffer, onProgress) {
    onProgress({ label: "Decoding waveform...", completed: 1, total: 4, percent: 25 });
    const channel = audioBuffer.getChannelData(0);
    const samplesPerChunk = Math.max(1, Math.floor(channel.length / 64));
    const energyCurve = [];
    for (let offset = 0; offset < channel.length; offset += samplesPerChunk) {
        let sum = 0;
        for (let index = offset; index < Math.min(offset + samplesPerChunk, channel.length); index += 1) {
            sum += Math.abs(channel[index]);
        }
        energyCurve.push(sum / samplesPerChunk);
    }
    const beatPositions = estimateBeats(energyCurve, audioBuffer.duration);
    const bpm = estimateBpm(beatPositions);
    onProgress({ label: "Extracted waveform energy.", completed: 2, total: 4, percent: 50 });
    onProgress({ label: "Classifying mood and genre...", completed: 3, total: 4, percent: 75 });
    const moodGenreText = await (0, GeminiService_1.runGemini)([
        "Classify mood and genre from music metadata only.",
        `File name: ${file.name}`,
        `BPM: ${bpm}`,
        `Duration: ${audioBuffer.duration.toFixed(2)} seconds`,
        "Return JSON with mood and genre."
    ].join("\n"), { json: true });
    const moodGenre = (0, perceptionUtils_1.normalizeJson)(moodGenreText, {});
    const sections = deriveSections(audioBuffer.duration);
    return {
        fileHash: await hashFile(file),
        fileName: file.name,
        bpm,
        beatPositions,
        energyCurve,
        sections,
        mood: moodGenre.mood ?? "Unknown",
        genre: moodGenre.genre ?? "Unknown",
        source: `${(0, perceptionUtils_1.signalSourceLabel)("audio")} + Gemini metadata labels`
    };
}
function boundedScore(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
}
function estimateBeats(energyCurve, duration) {
    const threshold = energyCurve.reduce((sum, value) => sum + value, 0) / Math.max(energyCurve.length, 1);
    return energyCurve
        .map((value, index) => value > threshold * 1.15 ? (index / Math.max(energyCurve.length - 1, 1)) * duration : null)
        .filter((value) => value !== null);
}
function estimateBpm(beatPositions) {
    if (beatPositions.length < 2) {
        return 0;
    }
    const intervals = [];
    for (let index = 1; index < beatPositions.length; index += 1) {
        intervals.push(beatPositions[index] - beatPositions[index - 1]);
    }
    const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
    return average > 0 ? Math.round(60 / average) : 0;
}
function deriveSections(duration) {
    const first = duration * 0.2;
    const second = duration * 0.55;
    return [
        { id: "intro", label: "Intro", start: 0, end: first },
        { id: "chorus", label: "Chorus", start: first, end: second },
        { id: "drop", label: "Drop", start: second, end: duration }
    ];
}
async function hashFile(file) {
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(digest))
        .slice(0, 12)
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("");
}
async function analyzeVisualPersonBatch(context, clips, onProgress) {
    const visual = [];
    const metadataOnly = [];
    for (let index = 0; index < clips.length; index += 4) {
        const batch = clips.slice(index, index + 4);
        onProgress({
            label: `Analyzing clip ${index + 1} of ${clips.length} with visual samples for Face AI`,
            completed: Math.min(index + 1, clips.length),
            total: Math.max(clips.length, 1)
        });
        for (const clip of batch) {
            const frameExtractor = (0, FrameExtractor_1.getFrameExtractor)();
            const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
            const frames = sample.frames.filter((frame) => frame.ok && frame.base64 && frame.mimeType).slice(0, 3);
            if (frames.length === 0) {
                metadataOnly.push(clip);
                continue;
            }
            const text = await (0, GeminiService_1.runGeminiVision)([
                `Clip: ${clip.name}`,
                "Identify the primary visible person cluster in these frames.",
                "Return JSON with keys: label, role, confidence, emotions.",
                "Role must be one of bride, groom, family, guest, unknown."
            ].join("\n"), frames.map((frame) => ({ mimeType: frame.mimeType, base64: frame.base64 })), { json: true });
            const parsed = (0, perceptionUtils_1.normalizeJson)(text, {});
            visual.push({
                clipId: clip.id,
                label: parsed.label ?? clip.name,
                role: parsed.role ?? "unknown",
                confidence: parsed.confidence ?? 0.6,
                emotions: parsed.emotions ?? []
            });
        }
    }
    return { visual, metadataOnly };
}
function aggregateClusters(visual) {
    const groups = new Map();
    for (const item of visual) {
        const key = `${item.role}:${item.label.toLowerCase()}`;
        const existing = groups.get(key);
        if (!existing) {
            groups.set(key, {
                id: key,
                label: item.label,
                role: item.role,
                confidence: item.confidence,
                clipIds: [item.clipId],
                emotionTags: [...item.emotions],
                source: "visual"
            });
            continue;
        }
        existing.clipIds.push(item.clipId);
        existing.confidence = Math.max(existing.confidence, item.confidence);
        existing.emotionTags = Array.from(new Set([...existing.emotionTags, ...item.emotions]));
    }
    return Array.from(groups.values());
}
async function analyzeVisualEmotionBatch(context, clips, onProgress) {
    const visual = [];
    const metadataOnly = [];
    for (let index = 0; index < clips.length; index += 4) {
        const batch = clips.slice(index, index + 4);
        onProgress({
            label: `Analyzing clip ${index + 1} of ${clips.length} with visual samples for Emotion AI`,
            completed: Math.min(index + 1, clips.length),
            total: Math.max(clips.length, 1)
        });
        for (const clip of batch) {
            const frameExtractor = (0, FrameExtractor_1.getFrameExtractor)();
            const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
            const frames = sample.frames.filter((frame) => frame.ok && frame.base64 && frame.mimeType).slice(0, 3);
            if (frames.length === 0) {
                metadataOnly.push(clip);
                continue;
            }
            const text = await (0, GeminiService_1.runGeminiVision)([
                `Clip: ${clip.name}`,
                "Classify the visible emotions across these frames.",
                "Return JSON with keys: emotions, confidence."
            ].join("\n"), frames.map((frame) => ({ mimeType: frame.mimeType, base64: frame.base64 })), { json: true });
            const parsed = (0, perceptionUtils_1.normalizeJson)(text, {});
            visual.push({
                clipId: clip.id,
                clipName: clip.name,
                emotions: parsed.emotions ?? [],
                confidence: parsed.confidence ?? 0.6,
                source: "visual"
            });
        }
    }
    return { visual, metadataOnly };
}
async function analyzeVisualCameraBatch(context, clips, onProgress) {
    const visual = [];
    const metadataOnly = [];
    for (let index = 0; index < clips.length; index += 4) {
        const batch = clips.slice(index, index + 4);
        onProgress({
            label: `Analyzing clip ${index + 1} of ${clips.length} with visual samples for Camera AI`,
            completed: Math.min(index + 1, clips.length),
            total: Math.max(clips.length, 1)
        });
        for (const clip of batch) {
            const frameExtractor = (0, FrameExtractor_1.getFrameExtractor)();
            const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
            const frames = sample.frames.filter((frame) => frame.ok && frame.base64 && frame.mimeType).slice(0, 4);
            if (frames.length === 0) {
                metadataOnly.push(clip);
                continue;
            }
            const text = await (0, GeminiService_1.runGeminiVision)([
                `Clip: ${clip.name}`,
                "Infer shot type and movement from these timeline frames.",
                "Return JSON with keys: shotType, movement, confidence."
            ].join("\n"), frames.map((frame) => ({ mimeType: frame.mimeType, base64: frame.base64 })), { json: true });
            const parsed = (0, perceptionUtils_1.normalizeJson)(text, {});
            visual.push({
                clipId: clip.id,
                clipName: clip.name,
                shotType: parsed.shotType ?? "unknown",
                movement: parsed.movement ?? "unknown",
                confidence: parsed.confidence ?? 0.6,
                source: "visual"
            });
        }
    }
    return { visual, metadataOnly };
}
async function analyzeClipTechnicalScores(context, onProgress) {
    const scores = [];
    const hashes = new Map();
    for (let index = 0; index < context.selectedClips.length; index += 1) {
        const clip = context.selectedClips[index];
        onProgress({
            label: `Analyzing clip ${index + 1} of ${context.selectedClips.length} with extracted frames`,
            completed: index + 1,
            total: Math.max(context.selectedClips.length, 1)
        });
        const frameExtractor = (0, FrameExtractor_1.getFrameExtractor)();
        const sample = await frameExtractor.extractClipSamples(context.sequenceKey, clip);
        const visualFrames = sample.frames.filter((frame) => frame.ok && frame.path);
        if (visualFrames.length === 0) {
            scores.push(metadataFallbackScore(clip));
            continue;
        }
        const stats = await Promise.all(visualFrames.slice(0, 3).map((frame) => analyzeImageFrame(frame.path)));
        const blur = average(stats.map((item) => item.blur));
        const focus = average(stats.map((item) => item.focus));
        const noise = average(stats.map((item) => item.noise));
        const exposure = average(stats.map((item) => item.exposure));
        const whiteBalance = average(stats.map((item) => item.whiteBalance));
        const hash = stats[0]?.averageHash ?? clip.id;
        const duplicateGroup = hashes.get(hash) ?? null;
        if (!hashes.has(hash)) {
            hashes.set(hash, clip.id);
        }
        scores.push({
            clipId: clip.id,
            clipName: clip.name,
            blur,
            focus,
            noise,
            exposure,
            whiteBalance,
            duplicateGroup,
            aiRating: Math.round(blur * 0.22 +
                focus * 0.22 +
                noise * 0.16 +
                exposure * 0.2 +
                whiteBalance * 0.2),
            source: "visual"
        });
    }
    return scores;
}
function metadataFallbackScore(clip) {
    const blur = boundedScore(72 - clip.track * 3);
    const focus = boundedScore(70 - clip.track * 2);
    const noise = boundedScore(64);
    const exposure = boundedScore(68);
    const whiteBalance = boundedScore(66);
    return {
        clipId: clip.id,
        clipName: clip.name,
        blur,
        focus,
        noise,
        exposure,
        whiteBalance,
        duplicateGroup: null,
        aiRating: Math.round(blur * 0.22 +
            focus * 0.22 +
            noise * 0.16 +
            exposure * 0.2 +
            whiteBalance * 0.2),
        source: "metadata-only"
    };
}
async function analyzeImageFrame(filePath) {
    const image = await loadImage(filePath);
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return {
            blur: 60,
            focus: 60,
            noise: 60,
            exposure: 60,
            whiteBalance: 60,
            averageHash: "ctx-missing"
        };
    }
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(0, 0, image.width, image.height).data;
    const grayscale = [];
    let totalLuma = 0;
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    for (let index = 0; index < data.length; index += 4) {
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        grayscale.push(luma);
        totalLuma += luma;
        totalR += r;
        totalG += g;
        totalB += b;
    }
    const mean = totalLuma / grayscale.length;
    const variance = grayscale.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / grayscale.length;
    const laplacian = estimateLaplacian(grayscale, image.width);
    const blur = boundedScore(Math.min(100, laplacian / 12));
    const focus = boundedScore(Math.min(100, variance / 18));
    const exposure = boundedScore(100 - Math.abs(mean - 128) * 0.7);
    const avgR = totalR / grayscale.length;
    const avgG = totalG / grayscale.length;
    const avgB = totalB / grayscale.length;
    const whiteBalance = boundedScore(100 - (Math.abs(avgR - avgG) + Math.abs(avgG - avgB)) * 0.4);
    const noise = boundedScore(100 - Math.min(80, estimateNoise(grayscale) * 4));
    return {
        blur,
        focus,
        noise,
        exposure,
        whiteBalance,
        averageHash: computeAverageHash(grayscale)
    };
}
function loadImage(filePath) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Could not load frame ${filePath}`));
        image.src = `file://${filePath}`;
    });
}
function estimateLaplacian(values, width) {
    let total = 0;
    for (let index = width + 1; index < values.length - width - 1; index += 1) {
        total += Math.abs(values[index - width] +
            values[index - 1] -
            4 * values[index] +
            values[index + 1] +
            values[index + width]);
    }
    return total / Math.max(values.length, 1);
}
function estimateNoise(values) {
    let total = 0;
    for (let index = 1; index < values.length; index += 1) {
        total += Math.abs(values[index] - values[index - 1]);
    }
    return total / Math.max(values.length - 1, 1);
}
function computeAverageHash(values) {
    const mean = average(values);
    return values
        .slice(0, 64)
        .map((value) => (value >= mean ? "1" : "0"))
        .join("");
}
function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}


/***/ },

/***/ 6680
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.buildClipPrompt = buildClipPrompt;
exports.runBatchedGemini = runBatchedGemini;
exports.normalizeJson = normalizeJson;
__webpack_unused_export__ = buildSequenceScope;
exports.signalSourceLabel = signalSourceLabel;
const GeminiService_1 = __webpack_require__(5449);
function buildClipPrompt(clips) {
    return clips
        .map((clip, index) => [
        `${index + 1}. ${clip.name}`,
        `clipId=${clip.id}`,
        `track=${clip.track}`,
        `start=${clip.start.toFixed(2)}s`,
        `duration=${clip.duration.toFixed(2)}s`,
        `mediaType=${clip.mediaType || "unknown"}`
    ].join(" | "))
        .join("\n");
}
async function runBatchedGemini({ clips, batchSize, buildPrompt, parse, responseSchema, onProgress }) {
    const results = [];
    for (let index = 0; index < clips.length; index += batchSize) {
        const batch = clips.slice(index, index + batchSize);
        onProgress?.({
            completed: Math.min(index + batch.length, clips.length),
            total: clips.length,
            label: `Analyzing clip ${index + 1} of ${clips.length}`
        });
        if (responseSchema) {
            const structured = await (0, GeminiService_1.runGeminiStructured)(buildPrompt(batch), responseSchema);
            results.push(...structured);
            continue;
        }
        const text = await (0, GeminiService_1.runGemini)(buildPrompt(batch), { json: true });
        results.push(...(parse ? parse(text) : []));
    }
    return results;
}
function normalizeJson(text, fallback) {
    try {
        return JSON.parse(text);
    }
    catch {
        return fallback;
    }
}
function buildSequenceScope(moduleId, context) {
    return `${moduleId}:${context.sequenceKey}`;
}
function signalSourceLabel(mode) {
    if (mode === "audio") {
        return "audio-signal analysis";
    }
    return "timeline metadata only (clip names, durations, track positions)";
}


/***/ },

/***/ 8936
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.useSequenceAnalysis = useSequenceAnalysis;
const react_1 = __webpack_require__(6540);
const brain_1 = __webpack_require__(7021);
const AICopilot_1 = __webpack_require__(318);
const contextEngine = new brain_1.ContextEngine();
const copilot = new AICopilot_1.AICopilot();
function useSequenceAnalysis({ moduleId, analyze }) {
    const [context, setContext] = (0, react_1.useState)(null);
    const [result, setResult] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [progress, setProgress] = (0, react_1.useState)({
        label: "Reading timeline...",
        completed: 0,
        total: 1,
        percent: 0
    });
    const [error, setError] = (0, react_1.useState)("");
    const cacheKey = (0, react_1.useMemo)(() => (context ? `${moduleId}:${context.sequenceKey}` : null), [context, moduleId]);
    async function load(force = false) {
        setLoading(true);
        setError("");
        setProgress({
            label: "Reading timeline...",
            completed: 0,
            total: 1,
            percent: 0
        });
        try {
            const nextContext = await contextEngine.readSequenceContext();
            setContext(nextContext);
            if (!nextContext) {
                setResult(null);
                setLoading(false);
                return;
            }
            const nextCacheKey = `${moduleId}:${nextContext.sequenceKey}`;
            const resolved = await copilot.resolve({
                intent: `${moduleId}:analysis`,
                context: nextContext,
                memoryScopeKey: nextCacheKey,
                memoryCacheKey: "result",
                skipMemory: force,
                geminiResolver: async () => analyze(nextContext, (nextProgress) => {
                    setProgress(normalizeProgressInput(nextProgress));
                })
            });
            setResult(resolved.value);
            setProgress({
                label: resolved.path === "memory" ? "Loaded cached analysis from MemoryEngine." : "Analysis complete.",
                completed: 1,
                total: 1,
                percent: 100
            });
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Analysis failed.");
        }
        finally {
            setLoading(false);
        }
    }
    (0, react_1.useEffect)(() => {
        void load(false);
    }, [moduleId]);
    function clearCache() {
        if (!cacheKey) {
            return;
        }
        const { MemoryEngine } = __webpack_require__(7021);
        new MemoryEngine().clearAnalysis(cacheKey, "result");
    }
    return {
        context,
        result,
        loading,
        progress,
        error,
        reanalyze: async () => {
            clearCache();
            await load(true);
        }
    };
}
function normalizeProgressInput(input) {
    if (typeof input === "string") {
        return {
            label: input,
            completed: 0,
            total: 1,
            percent: 0
        };
    }
    const total = Math.max(1, input.total ?? 1);
    const completed = Math.max(0, Math.min(input.completed ?? 0, total));
    const percent = input.percent !== undefined
        ? Math.max(0, Math.min(100, input.percent))
        : Math.round((completed / total) * 100);
    return {
        label: input.label,
        completed,
        total,
        percent
    };
}


/***/ },

/***/ 2232
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = PromptReelScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const AutoEditAssembler_1 = __webpack_require__(5336);
const promptReelService_1 = __webpack_require__(2541);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const musicAnalysisCache_1 = __webpack_require__(4262);
const assembler = new AutoEditAssembler_1.AutoEditAssembler();
function PromptReelScreen() {
    const [prompt, setPrompt] = (0, react_1.useState)("bhai mast reel bana, bride entry aur varmala pe focus karo, 60 second ka");
    const [useSelectedClips, setUseSelectedClips] = (0, react_1.useState)(true);
    const [plan, setPlan] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [analyzing, setAnalyzing] = (0, react_1.useState)(false);
    const [assembling, setAssembling] = (0, react_1.useState)(false);
    const [progressPercent, setProgressPercent] = (0, react_1.useState)(0);
    const [progressLabel, setProgressLabel] = (0, react_1.useState)("Enter a creative prompt and generate a reel plan.");
    const [error, setError] = (0, react_1.useState)("");
    const [analysisStatus, setAnalysisStatus] = (0, react_1.useState)(null);
    const [musicOptions, setMusicOptions] = (0, react_1.useState)(() => (0, promptReelService_1.getPromptReelMusicOptions)());
    const [selectedMusicHash, setSelectedMusicHash] = (0, react_1.useState)(() => (0, promptReelService_1.getPromptReelMusicOptions)()[0]?.fileHash ?? "");
    const [songLoading, setSongLoading] = (0, react_1.useState)(false);
    const activeSelectionMode = plan?.selectionMode ?? analysisStatus?.selectionMode;
    const hasPrompt = prompt.trim().length > 0;
    const selectedMusic = musicOptions.find((entry) => entry.fileHash === selectedMusicHash) ?? null;
    const activeModeLabel = (0, react_1.useMemo)(() => {
        if (activeSelectionMode === "selected") {
            return "Using selected clips";
        }
        if (activeSelectionMode === "sequence-fallback") {
            return "No selection found. Fell back to all clips in sequence";
        }
        if (activeSelectionMode === "sequence") {
            return "Using all clips in sequence";
        }
        return useSelectedClips ? "Selected clips preferred" : "All clips in sequence";
    }, [activeSelectionMode, useSelectedClips]);
    async function handleGenerate(skipMemory = false, allowGeneric = false) {
        if (!prompt.trim()) {
            setError("Enter a creative prompt before generating.");
            return;
        }
        setLoading(true);
        setError("");
        setPlan(null);
        setProgressPercent(20);
        setProgressLabel("Reading Premiere context and cached analysis...");
        try {
            const nextAnalysisStatus = await (0, promptReelService_1.inspectPromptReelAnalysis)({ useSelectedClips, musicFileHash: selectedMusicHash || undefined });
            setAnalysisStatus(nextAnalysisStatus);
            if (nextAnalysisStatus.needsAnalysis && !allowGeneric) {
                setProgressPercent(0);
                setProgressLabel("Analysis is missing for most active clips. Analyze now or continue with a generic plan.");
                return;
            }
            setProgressPercent(35);
            setProgressLabel("Building a reel plan from Premiere context and cached analysis...");
            const result = await (0, promptReelService_1.generatePromptReelPlan)({
                prompt: prompt.trim(),
                useSelectedClips,
                skipMemory,
                musicFileHash: selectedMusicHash || undefined
            });
            setPlan(result.plan);
            setProgressLabel(`Plan ready via ${result.plan.resolutionPath}. Assembling a new sequence automatically...`);
            setLoading(false);
            await handleAssembly(result.plan);
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not generate a prompt reel.");
            setPlan(null);
            setProgressPercent(0);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleAnalyzeNow() {
        setAnalyzing(true);
        setError("");
        setPlan(null);
        setProgressPercent(0);
        setProgressLabel("Starting Wedding AI, Emotion AI, and Clip Intelligence for the active clips...");
        try {
            const nextAnalysisStatus = await (0, promptReelService_1.analyzePromptReelSelection)({
                useSelectedClips,
                onProgress: (next) => {
                    setProgressPercent(next.percent);
                    setProgressLabel(next.label);
                }
            });
            setAnalysisStatus(await (0, promptReelService_1.inspectPromptReelAnalysis)({ useSelectedClips, musicFileHash: selectedMusicHash || undefined }));
            setProgressPercent(100);
            setProgressLabel(nextAnalysisStatus.needsAnalysis
                ? "Core analysis finished, but some active clips are still missing signals. You can generate anyway."
                : "Core analysis complete. Generate Reel to build an informed preview.");
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not analyze the active clips.");
            setProgressPercent(0);
        }
        finally {
            setAnalyzing(false);
        }
    }
    async function handleSongFile(file) {
        if (!file) {
            return;
        }
        setSongLoading(true);
        setError("");
        setPlan(null);
        setProgressPercent(10);
        setProgressLabel("Analyzing selected song for beat and energy data...");
        try {
            const result = await (0, musicAnalysisCache_1.analyzeAndCacheMusicFile)(file, (next) => {
                setProgressLabel(next.label);
                if (next.percent !== undefined) {
                    setProgressPercent(next.percent);
                }
            });
            const options = (0, promptReelService_1.getPromptReelMusicOptions)();
            setMusicOptions(options);
            setSelectedMusicHash(result.fileHash);
            setAnalysisStatus(null);
            setProgressPercent(100);
            setProgressLabel(`Song analysis ready: ${result.fileName}. It will weight the next reel plan.`);
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not analyze the selected song.");
            setProgressPercent(0);
        }
        finally {
            setSongLoading(false);
        }
    }
    async function handleAssembly(planToAssemble) {
        setAssembling(true);
        setError("");
        setProgressPercent(0);
        setProgressLabel("Submitting reel plan through the live Premiere executor...");
        try {
            const message = await assembler.assembleReelPlan(planToAssemble, { learnedFrom: "Prompt Reel" }, (next) => {
                setProgressPercent(next.percent);
                setProgressLabel(`${next.label} (${next.completed}/${next.total})`);
            });
            setProgressPercent(100);
            setProgressLabel(message);
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not assemble the reel.");
        }
        finally {
            setAssembling(false);
        }
    }
    function removeClip(clipId) {
        setPlan((current) => {
            if (!current) {
                return current;
            }
            const clips = current.clips.filter((clip) => clip.clipId !== clipId);
            return {
                ...current,
                clips,
                totalDurationSeconds: clips.reduce((sum, clip) => sum + clip.durationSeconds, 0)
            };
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Prompt Reel", subtitle: "Free-text reel planning from Premiere selection, with cached AI analysis and automatic new-sequence assembly.", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: loading ? "Planning" : assembling ? "Assembling" : "Ready", tone: loading || assembling ? "warning" : "success" }), analyzing && (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Analyzing clips", tone: "warning" }), songLoading && (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Analyzing song", tone: "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: activeModeLabel, tone: activeSelectionMode === "sequence-fallback" ? "warning" : "neutral" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: selectedMusic ? `Song: ${selectedMusic.fileName}` : "No song energy", tone: selectedMusic ? "success" : "neutral" }), plan && (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Plan via ${plan.resolutionPath}`, tone: plan.resolutionPath === "gemini" ? "warning" : "success" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "prompt-reel-song", style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: "Song energy" }), (0, jsx_runtime_1.jsxs)("select", { id: "prompt-reel-song", value: selectedMusicHash, onChange: (event) => {
                                    setSelectedMusicHash(event.target.value);
                                    setPlan(null);
                                    setAnalysisStatus(null);
                                }, disabled: songLoading || loading || analyzing || assembling, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "No song selected" }), musicOptions.map((entry) => ((0, jsx_runtime_1.jsxs)("option", { value: entry.fileHash, children: [entry.fileName, " (", entry.bpm, " BPM)"] }, entry.fileHash)))] }), (0, jsx_runtime_1.jsxs)("label", { style: { color: theme_1.colors.inkMuted, fontSize: 13 }, children: ["Analyze a song", (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "audio/*", onChange: (event) => void handleSongFile(event.target.files?.[0] ?? null), disabled: songLoading || loading || analyzing || assembling, style: { marginLeft: theme_1.spacing.xs } })] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm, marginTop: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "prompt-reel-input", style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: "Creative prompt" }), (0, jsx_runtime_1.jsx)(primitives_1.Textarea, { id: "prompt-reel-input", rows: 5, value: prompt, onChange: (event) => setPrompt(event.target.value), "aria-describedby": "prompt-reel-help", "aria-invalid": !hasPrompt, placeholder: "Example: bhai mast reel bana, bride entry aur varmala pe focus karo, 60 second ka" }), (0, jsx_runtime_1.jsx)("div", { id: "prompt-reel-help", style: { color: hasPrompt ? theme_1.colors.inkMuted : theme_1.colors.danger, fontSize: 13 }, children: hasPrompt
                                    ? "Describe the moments, mood, and target duration you want."
                                    : "Enter a creative prompt to enable reel generation." })] }), (0, jsx_runtime_1.jsxs)("label", { style: {
                            marginTop: theme_1.spacing.md,
                            display: "inline-flex",
                            gap: theme_1.spacing.sm,
                            alignItems: "center",
                            color: theme_1.colors.ink
                        }, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: useSelectedClips, onChange: (event) => {
                                    setUseSelectedClips(event.target.checked);
                                    setAnalysisStatus(null);
                                    setPlan(null);
                                } }), "Use selected clips first"] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void handleGenerate(false), disabled: !hasPrompt || loading || analyzing || assembling, children: loading ? "Planning..." : "Generate Reel" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void handleGenerate(true), disabled: !hasPrompt || loading || analyzing, children: "Regenerate" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => setPlan(null), disabled: loading || analyzing || !plan, children: "Clear Preview" })] }), analysisStatus?.needsAnalysis && ((0, jsx_runtime_1.jsxs)("div", { role: "alert", style: {
                            marginTop: theme_1.spacing.md,
                            border: `1px solid ${theme_1.colors.warning}`,
                            borderRadius: 12,
                            background: theme_1.colors.panelMuted,
                            padding: theme_1.spacing.md,
                            display: "flex",
                            flexDirection: "column",
                            gap: theme_1.spacing.sm,
                            color: theme_1.colors.ink
                        }, children: [(0, jsx_runtime_1.jsx)("strong", { style: { color: theme_1.colors.maroonDeep }, children: analysisStatus.message }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted, fontSize: 13 }, children: ["Coverage: ", analysisStatus.analyzedClipCount, "/", analysisStatus.clipCount, " active video clips. Wedding AI ", analysisStatus.weddingClipCount, "/", analysisStatus.clipCount, ", Emotion AI ", analysisStatus.emotionClipCount, "/", analysisStatus.clipCount, ", Clip Intelligence ", analysisStatus.clipIntelligenceClipCount, "/", analysisStatus.clipCount, ". Music AI: ", formatMusicStatus(analysisStatus.musicStatus), "."] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: 13 }, children: "Analyze now runs Wedding AI, Emotion AI, and Clip Intelligence for this clip set. Music AI needs a selected audio file in its own screen before it can contribute an energy curve." }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void handleAnalyzeNow(), disabled: loading || analyzing || assembling, children: analyzing ? "Analyzing..." : "Analyze now" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void handleGenerate(false, true), disabled: !hasPrompt || loading || analyzing || assembling, children: "Generate anyway" })] })] })), (loading || analyzing || assembling || progressPercent > 0) && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progressPercent, label: progressLabel }) })), error && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.danger }, children: error }))] }), plan && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: plan.title, subtitle: plan.intentSummary, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${plan.clips.length} clips`, tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${plan.totalDurationSeconds.toFixed(1)}s total` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${plan.targetDurationSeconds.toFixed(0)}s target`, tone: "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: plan.templateName })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.xs, marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted }, children: [plan.notes.map((note, index) => ((0, jsx_runtime_1.jsx)("div", { children: note }, `${index}-${note.slice(0, 18)}`))), plan.durationQualityWarning && ((0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.warning }, children: [plan.durationQualityWarning, " A warning was added to Developer Center logs."] }))] })] }), (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Preview Clip Order", subtitle: "The plan remains visible while it assembles into a new Premiere sequence.", children: [(0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: plan.clips.map((clip, index) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                        border: `1px solid ${theme_1.colors.border}`,
                                        borderRadius: 12,
                                        background: theme_1.colors.white,
                                        padding: theme_1.spacing.md,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: theme_1.spacing.sm
                                    }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: [index + 1, ". ", clip.clipName] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted, fontSize: 13 }, children: [clip.start.toFixed(1), "s - ", clip.end.toFixed(1), "s source \u2022 ", clip.durationSeconds.toFixed(1), "s in reel"] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: clip.shotType }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Score ${clip.selectionScore.toFixed(2)}`, tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "ghost", onClick: () => removeClip(clip.clipId), disabled: assembling, children: "Remove" })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.ink }, children: clip.reason }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Emotion ${clip.emotionWeight.toFixed(2)}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Music ${clip.musicEnergyWeight.toFixed(2)}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Shot ${clip.shotWeight.toFixed(2)}` })] })] }, clip.clipId))) }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { alignSelf: "center", color: assembling ? theme_1.colors.maroonDeep : theme_1.colors.inkMuted }, children: assembling ? "Assembling new sequence..." : "Plans assemble automatically into a new sequence." }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void handleGenerate(true), disabled: loading || analyzing, children: "Regenerate Plan" })] })] })] }))] }));
}
function formatMusicStatus(status) {
    if (status === "available") {
        return "a single cached song is available";
    }
    if (status === "ambiguous") {
        return "multiple cached songs are not bound to this sequence";
    }
    return "no cached song analysis";
}


/***/ },

/***/ 2541
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.inspectPromptReelAnalysis = inspectPromptReelAnalysis;
exports.analyzePromptReelSelection = analyzePromptReelSelection;
exports.generatePromptReelPlan = generatePromptReelPlan;
exports.getPromptReelMusicOptions = getPromptReelMusicOptions;
const GeminiService_1 = __webpack_require__(5449);
const AICopilot_1 = __webpack_require__(318);
const schemas_1 = __webpack_require__(8156);
const config_1 = __webpack_require__(7028);
const brain_1 = __webpack_require__(7021);
const PremiereBridge_1 = __webpack_require__(1862);
const loggerService_1 = __webpack_require__(2954);
const templates_1 = __webpack_require__(6552);
const musicAnalysisCache_1 = __webpack_require__(4262);
const perceptionAnalyzers_1 = __webpack_require__(990);
const copilot = new AICopilot_1.AICopilot();
const memory = new brain_1.MemoryEngine();
const contextEngine = new brain_1.ContextEngine();
const bridge = new PremiereBridge_1.PremiereBridge();
const DEFAULT_TARGET_SECONDS = 60;
const STANDARD_MIN_CLIP_DURATION_SECONDS = 1.2;
const RELAXED_MIN_CLIP_DURATION_SECONDS = 0.5;
const FLAT_DURATION_EPSILON_SECONDS = 0.15;
const FLAT_DURATION_RATIO = 0.8;
async function inspectPromptReelAnalysis({ useSelectedClips, musicFileHash }) {
    const source = await readPromptReelSource(useSelectedClips);
    return buildAnalysisStatus(source, readCachedAnalysis(source.sequenceContext.sequenceKey, musicFileHash));
}
async function analyzePromptReelSelection({ useSelectedClips, onProgress }) {
    const source = await readPromptReelSource(useSelectedClips);
    const videoClips = getVideoClips(source.clips);
    if (videoClips.length === 0) {
        throw new Error("No video clips are available for Prompt Reel analysis.");
    }
    const analysisContext = {
        ...source.sequenceContext,
        selectedClips: videoClips
    };
    const existing = readCachedAnalysis(source.sequenceContext.sequenceKey);
    const total = 3;
    const scope = source.sequenceContext.sequenceKey;
    onProgress?.({ label: "Starting Wedding AI analysis...", completed: 0, total, percent: 0 });
    const wedding = await forcePromptReelAnalysis("wedding-ai:analysis", `wedding-ai:${scope}`, analysisContext, perceptionAnalyzers_1.analyzeWeddingSegments, createAnalysisProgressReporter("Wedding AI", 0, total, onProgress));
    memory.setAnalysis(`wedding-ai:${scope}`, "result", mergeWeddingAnalysis(existing.wedding, wedding));
    onProgress?.({ label: "Starting Emotion AI analysis...", completed: 1, total, percent: 34 });
    const emotion = await forcePromptReelAnalysis("emotion-ai:analysis", `emotion-ai:${scope}`, analysisContext, perceptionAnalyzers_1.analyzeEmotions, createAnalysisProgressReporter("Emotion AI", 1, total, onProgress));
    memory.setAnalysis(`emotion-ai:${scope}`, "result", mergeEmotionAnalysis(existing.emotion, emotion));
    onProgress?.({ label: "Starting Clip Intelligence analysis...", completed: 2, total, percent: 67 });
    const intelligence = await forcePromptReelAnalysis("clip-intelligence:analysis", `clip-intelligence:${scope}`, analysisContext, perceptionAnalyzers_1.analyzeClipIntelligence, createAnalysisProgressReporter("Clip Intelligence", 2, total, onProgress));
    memory.setAnalysis(`clip-intelligence:${scope}`, "result", mergeClipIntelligenceAnalysis(existing.intelligence, intelligence));
    const status = await inspectPromptReelAnalysis({ useSelectedClips });
    onProgress?.({ label: "Prompt Reel analysis complete.", completed: total, total, percent: 100 });
    loggerService_1.loggerService.log(`[Prompt Reel] Core analysis completed for ${status.analyzedClipCount}/${status.clipCount} active video clips.`, "success");
    return status;
}
async function generatePromptReelPlan({ prompt, useSelectedClips, skipMemory = false, musicFileHash }) {
    const source = await readPromptReelSource(useSelectedClips);
    const analysis = readCachedAnalysis(source.sequenceContext.sequenceKey, musicFileHash);
    const intent = parsePromptIntent(prompt);
    const candidates = buildCandidates(source.clips, analysis, source.sequenceContext, intent);
    if (candidates.length === 0) {
        throw new Error("No video clips were available to plan a reel.");
    }
    const clipSignature = hashText(candidates.map((clip) => clip.id).join("|"));
    const analysisSignature = hashText(buildAnalysisSignature(candidates));
    const memoryScopeKey = `prompt-reel:${source.sequenceContext.sequenceKey}:${source.mode}:${hashText(prompt)}:${clipSignature}:${analysisSignature}`;
    const hasGeminiKey = Boolean((0, config_1.resolveGeminiConfig)().apiKey);
    const resolved = await copilot.resolve({
        intent: "prompt-reel:generate",
        context: {
            prompt,
            mode: source.mode,
            intent,
            candidates,
            sequenceContext: source.sequenceContext,
            analysisSummary: summarizeAnalysis(analysis)
        },
        memoryScopeKey,
        memoryCacheKey: "result",
        skipMemory,
        localResolver: async (_snapshot, rawContext) => {
            const ctx = rawContext;
            if (!hasGeminiKey || ctx.intent.genericTemplateOnly) {
                return buildLocalPlan(ctx.mode, ctx.intent, ctx.candidates, analysis.music);
            }
            return null;
        },
        geminiResolver: async (_snapshot, rawContext) => {
            const ctx = rawContext;
            return (0, GeminiService_1.runGeminiStructured)(buildGeminiPrompt(ctx.prompt, ctx.mode, ctx.intent, ctx.candidates, analysis.music), schemas_1.reelPlanSchema);
        }
    });
    const plan = hydratePlan(resolved.value, candidates, resolved.path, source.mode);
    if (resolved.path === "gemini" || resolved.path === "cache") {
        const durationQualityWarning = findFlatGeminiDurationWarning(plan, candidates, intent);
        if (durationQualityWarning) {
            plan.durationQualityWarning = durationQualityWarning;
            loggerService_1.loggerService.log(`[Prompt Reel] ${durationQualityWarning}`, "warn");
        }
    }
    return {
        sequenceContext: source.sequenceContext,
        plan
    };
}
async function readPromptReelSource(useSelectedClips) {
    const sequenceContext = await contextEngine.readSequenceContext();
    if (!sequenceContext) {
        throw new Error("Open an active Premiere sequence before generating a prompt reel.");
    }
    const hasSelection = useSelectedClips && sequenceContext.selectedClips.length > 0;
    const chosenClips = hasSelection ? sequenceContext.selectedClips : await readAllSequenceClips();
    const mode = hasSelection
        ? "selected"
        : useSelectedClips
            ? "sequence-fallback"
            : "sequence";
    if (chosenClips.length === 0) {
        throw new Error("No timeline clips were available to plan a reel.");
    }
    const inOutClips = applyInOutRange(chosenClips, sequenceContext.inPoint, sequenceContext.outPoint);
    return {
        sequenceContext,
        clips: inOutClips.length > 0 ? inOutClips : chosenClips,
        mode
    };
}
async function forcePromptReelAnalysis(intent, memoryScopeKey, context, analyze, onProgress) {
    const resolved = await copilot.resolve({
        intent,
        context,
        memoryScopeKey,
        memoryCacheKey: "result",
        skipMemory: true,
        geminiResolver: async () => analyze(context, onProgress)
    });
    return resolved.value;
}
function createAnalysisProgressReporter(moduleLabel, moduleIndex, totalModules, onProgress) {
    return (progress) => {
        if (!onProgress) {
            return;
        }
        const currentPercent = normalizeAnalysisPercent(progress);
        onProgress({
            label: `${moduleLabel}: ${typeof progress === "string" ? progress : progress.label}`,
            completed: Math.min(totalModules, moduleIndex + Math.round(currentPercent / 100)),
            total: totalModules,
            percent: Math.round(((moduleIndex + currentPercent / 100) / totalModules) * 100)
        });
    };
}
function normalizeAnalysisPercent(progress) {
    if (typeof progress === "string") {
        return 0;
    }
    if (progress.percent !== undefined) {
        return Math.max(0, Math.min(100, progress.percent));
    }
    const total = Math.max(1, progress.total ?? 1);
    return Math.round((Math.max(0, progress.completed ?? 0) / total) * 100);
}
function mergeWeddingAnalysis(existing, fresh) {
    return {
        ...fresh,
        segments: mergeAnalysisEntries(existing?.segments ?? [], fresh.segments, (segment) => `${canonicalClipId(segment.id)}:${segment.label}:${segment.start.toFixed(3)}:${segment.end.toFixed(3)}`).sort((left, right) => left.start - right.start)
    };
}
function mergeEmotionAnalysis(existing, fresh) {
    return {
        ...fresh,
        clips: mergeAnalysisEntries(existing?.clips ?? [], fresh.clips, (clip) => canonicalClipId(clip.clipId))
    };
}
function mergeClipIntelligenceAnalysis(existing, fresh) {
    return {
        ...fresh,
        clips: mergeAnalysisEntries(existing?.clips ?? [], fresh.clips, (clip) => canonicalClipId(clip.clipId)).sort((left, right) => right.aiRating - left.aiRating)
    };
}
function mergeAnalysisEntries(existing, fresh, identity) {
    const merged = new Map();
    for (const entry of existing) {
        merged.set(identity(entry), entry);
    }
    for (const entry of fresh) {
        merged.set(identity(entry), entry);
    }
    return [...merged.values()];
}
function buildAnalysisStatus(source, analysis) {
    const clips = getVideoClips(source.clips);
    const weddingClipCount = clips.filter((clip) => hasWeddingAnalysis(clip, analysis)).length;
    const emotionClipCount = clips.filter((clip) => hasEmotionAnalysis(clip, analysis)).length;
    const clipIntelligenceClipCount = clips.filter((clip) => hasClipIntelligenceAnalysis(clip, analysis)).length;
    const analyzedClipCount = clips.filter((clip) => hasWeddingAnalysis(clip, analysis) ||
        hasEmotionAnalysis(clip, analysis) ||
        hasClipIntelligenceAnalysis(clip, analysis)).length;
    const unanalysedClipCount = clips.length - analyzedClipCount;
    const coverageRatio = clips.length > 0 ? analyzedClipCount / clips.length : 0;
    const needsAnalysis = clips.length > 0 && unanalysedClipCount / clips.length >= 0.8;
    return {
        selectionMode: source.mode,
        clipCount: clips.length,
        analyzedClipCount,
        unanalysedClipCount,
        coverageRatio,
        weddingClipCount,
        emotionClipCount,
        clipIntelligenceClipCount,
        musicStatus: analysis.music !== null ? "available" : analysis.musicCacheCount > 1 ? "ambiguous" : "missing",
        needsAnalysis,
        message: needsAnalysis
            ? "No analysis found for these clips yet — results will be generic. Run Wedding AI / Emotion AI first for better clip selection."
            : null
    };
}
function getVideoClips(clips) {
    return clips.filter((clip) => clip.mediaType !== "audio" && clip.type !== "audio");
}
function hasWeddingAnalysis(clip, analysis) {
    return (analysis.wedding?.segments ?? []).some((segment) => clipMatchesId(clip, segment.id) || overlapsSegment(clip, segment));
}
function hasEmotionAnalysis(clip, analysis) {
    return (analysis.emotion?.clips ?? []).some((entry) => clipMatchesId(clip, entry.clipId));
}
function hasClipIntelligenceAnalysis(clip, analysis) {
    return (analysis.intelligence?.clips ?? []).some((entry) => clipMatchesId(clip, entry.clipId));
}
function buildAnalysisSignature(candidates) {
    return candidates
        .map((clip) => [
        clip.id,
        clip.weddingLabels.join(","),
        clip.faceRoles.join(","),
        clip.emotionTags.join(","),
        clip.shotType,
        clip.technicalScore.toFixed(3),
        clip.musicEnergy.toFixed(3)
    ].join("~"))
        .join("|");
}
function findFlatGeminiDurationWarning(plan, candidates, intent) {
    if (plan.clips.length < 2) {
        return null;
    }
    const largestCluster = plan.clips.reduce((largest, anchor) => {
        const count = plan.clips.filter((clip) => Math.abs(clip.durationSeconds - anchor.durationSeconds) <= FLAT_DURATION_EPSILON_SECONDS).length;
        return count > largest.count ? { count, duration: anchor.durationSeconds } : largest;
    }, { count: 0, duration: 0 });
    const flatRatio = largestCluster.count / plan.clips.length;
    if (flatRatio < FLAT_DURATION_RATIO) {
        return null;
    }
    const candidateMap = new Map(candidates.map((clip) => [clip.id, clip]));
    const expectedWeights = plan.clips
        .map((clip) => candidateMap.get(clip.clipId))
        .filter((clip) => clip !== undefined)
        .map((clip) => deriveWeights(clip, intent));
    const variedSignals = getVariedWeightSignals(expectedWeights);
    if (variedSignals.length === 0) {
        return null;
    }
    return `Gemini reel plan looks suspiciously flat: ${largestCluster.count}/${plan.clips.length} clips (${Math.round(flatRatio * 100)}%) are within ${FLAT_DURATION_EPSILON_SECONDS.toFixed(2)}s of ${largestCluster.duration.toFixed(2)}s despite varying ${variedSignals.join(", ")} inputs.`;
}
function getVariedWeightSignals(weights) {
    const signals = [
        ["emotion", weights.map((weight) => weight.emotionWeight)],
        ["music energy", weights.map((weight) => weight.musicEnergyWeight)],
        ["shot type", weights.map((weight) => weight.shotWeight)]
    ];
    return signals
        .filter(([, values]) => values.length > 1 && Math.max(...values) - Math.min(...values) >= 0.1)
        .map(([label]) => label);
}
function buildGeminiPrompt(prompt, mode, intent, candidates, music) {
    return [
        "Create a Premiere reel plan from the user prompt and candidate clip metadata.",
        `User prompt: ${prompt}`,
        `Selection mode: ${mode}`,
        `Target duration: ${intent.targetDurationSeconds} seconds.`,
        `Template bias: ${intent.templateName}.`,
        "Rules:",
        "- Do not invent clip ids. Use only the candidate clip ids below.",
        "- Include however many clips fit the target duration and prompt intent. There is no fixed clip-count cap.",
        "- Each clip must include a short, specific reason that references prompt intent or clip signals.",
        "- Each clip duration must vary by emotionWeight + musicEnergyWeight + shotWeight. Do not use a flat duration for every clip.",
        "- Favor the user's requested moments such as bride entry, varmala, family, reactions, dance, emotional beats, or close-ups when present.",
        music
            ? "Music AI cache is available. You may use the provided musicEnergy values."
            : "No reliable Music AI song binding is available for this sequence. Use musicEnergyWeight=0 when not justified.",
        "",
        "Candidate clips:",
        ...candidates.map((clip, index) => [
            `${index + 1}. clipId=${clip.id}`,
            `name=${clip.name}`,
            `start=${clip.start.toFixed(2)} end=${clip.end.toFixed(2)} duration=${clip.duration.toFixed(2)}`,
            `wedding=${clip.weddingLabels.join(",") || "none"}`,
            `faces=${clip.faceRoles.join(",") || "none"}`,
            `emotions=${clip.emotionTags.join(",") || "none"}`,
            `shotType=${clip.shotType}`,
            `technicalScore=${clip.technicalScore.toFixed(2)}`,
            `musicEnergy=${clip.musicEnergy.toFixed(2)}`,
            `selectionScore=${clip.selectionScore.toFixed(2)}`
        ].join(" | "))
    ].join("\n");
}
function buildLocalPlan(mode, intent, candidates, music) {
    const sorted = [...candidates].sort((left, right) => right.selectionScore - left.selectionScore);
    const standardClips = selectLocalPlanClips(sorted, intent, STANDARD_MIN_CLIP_DURATION_SECONDS, false);
    const usedRelaxedRetry = standardClips.length === 0;
    const clips = usedRelaxedRetry
        ? selectLocalPlanClips(sorted, intent, RELAXED_MIN_CLIP_DURATION_SECONDS, true)
        : standardClips;
    if (clips.length === 0 && sorted[0]) {
        const weights = deriveWeights(sorted[0], intent);
        const fallbackDuration = deriveLastResortDuration(sorted[0], intent, sorted.length);
        clips.push({
            clipId: sorted[0].id,
            durationSeconds: fallbackDuration,
            reason: `${buildReason(sorted[0], intent, weights)}; used a target-derived last-resort duration`,
            emotionWeight: weights.emotionWeight,
            musicEnergyWeight: weights.musicEnergyWeight,
            shotWeight: weights.shotWeight
        });
    }
    return {
        title: `${intent.templateName} Prompt Reel`,
        templateName: intent.templateName,
        intentSummary: `${intent.summary} Planned from ${mode === "selected" ? "selected clips" : "sequence clips"} using cached analysis and prompt heuristics.`,
        targetDurationSeconds: intent.targetDurationSeconds,
        clips,
        notes: [
            `Prompt keywords: ${intent.promptTags.join(", ") || "generic reel request"}.`,
            music
                ? "Duration weighting includes a cached Music AI energy proxy."
                : "No bound Music AI song analysis was available, so music energy weight may remain zero.",
            ...(usedRelaxedRetry
                ? ["No standard-duration clip fit the target, so Prompt Reel retried with short-duration pacing before any fallback."]
                : [])
        ]
    };
}
function selectLocalPlanClips(sorted, intent, minimumDuration, fitToRemainingBudget) {
    const clips = [];
    let total = 0;
    for (const clip of sorted) {
        const weights = deriveWeights(clip, intent);
        const weightedDuration = weightedClipDuration(weights);
        const remainingBudget = intent.targetDurationSeconds + 0.75 - total;
        const requestedDuration = fitToRemainingBudget ? Math.min(weightedDuration, remainingBudget) : weightedDuration;
        const durationSeconds = clampDuration(clip.duration, requestedDuration, minimumDuration);
        if (total + durationSeconds > intent.targetDurationSeconds + 0.75) {
            continue;
        }
        clips.push({
            clipId: clip.id,
            durationSeconds,
            reason: buildReason(clip, intent, weights),
            emotionWeight: weights.emotionWeight,
            musicEnergyWeight: weights.musicEnergyWeight,
            shotWeight: weights.shotWeight
        });
        total += durationSeconds;
    }
    return clips;
}
function weightedClipDuration(weights) {
    return (STANDARD_MIN_CLIP_DURATION_SECONDS +
        weights.emotionWeight * 2.4 +
        weights.musicEnergyWeight * 1.6 +
        weights.shotWeight * 1.8);
}
function deriveLastResortDuration(clip, intent, candidateCount) {
    const expectedClipCount = Math.max(1, Math.min(candidateCount, Math.ceil(intent.targetDurationSeconds / 2.5)));
    const targetDerivedDuration = intent.targetDurationSeconds / expectedClipCount;
    return clampDuration(clip.duration, targetDerivedDuration, RELAXED_MIN_CLIP_DURATION_SECONDS);
}
function hydratePlan(generated, candidates, resolutionPath, selectionMode) {
    const candidateMap = new Map(candidates.map((clip) => [clip.id, clip]));
    const clips = [];
    for (const item of generated.clips) {
        const clip = candidateMap.get(item.clipId);
        if (!clip) {
            continue;
        }
        clips.push({
            clipId: clip.id,
            clipName: clip.name,
            start: clip.start,
            end: clip.end,
            sourceDuration: clip.duration,
            durationSeconds: clampDuration(clip.duration, item.durationSeconds),
            track: clip.track,
            mediaType: clip.mediaType,
            mediaPath: clip.mediaPath,
            projectItemId: clip.projectItemId,
            shotType: clip.shotType,
            emotionWeight: normalizeWeight(item.emotionWeight),
            musicEnergyWeight: normalizeWeight(item.musicEnergyWeight),
            shotWeight: normalizeWeight(item.shotWeight),
            selectionScore: clip.selectionScore,
            reason: item.reason.trim(),
            promptTags: [...clip.weddingLabels, ...clip.emotionTags, ...clip.faceRoles].filter(Boolean)
        });
    }
    const totalDurationSeconds = clips.reduce((sum, clip) => sum + clip.durationSeconds, 0);
    return {
        title: generated.title,
        templateName: generated.templateName,
        intentSummary: generated.intentSummary,
        targetDurationSeconds: generated.targetDurationSeconds,
        totalDurationSeconds,
        selectionMode,
        resolutionPath,
        clips,
        notes: generated.notes
    };
}
function getPromptReelMusicOptions() {
    return (0, musicAnalysisCache_1.listCachedMusicAnalyses)();
}
function readCachedAnalysis(sequenceKey, musicFileHash) {
    const musicEntries = (0, musicAnalysisCache_1.listCachedMusicAnalyses)();
    const music = musicFileHash
        ? musicEntries.find((entry) => entry.fileHash === musicFileHash) ?? null
        : musicEntries.length === 1
            ? musicEntries[0]
            : null;
    return {
        wedding: memory.getAnalysis(`wedding-ai:${sequenceKey}`, "result"),
        face: memory.getAnalysis(`face-ai:${sequenceKey}`, "result"),
        emotion: memory.getAnalysis(`emotion-ai:${sequenceKey}`, "result"),
        camera: memory.getAnalysis(`camera-ai:${sequenceKey}`, "result"),
        intelligence: memory.getAnalysis(`clip-intelligence:${sequenceKey}`, "result"),
        music,
        musicCacheCount: musicEntries.length
    };
}
function summarizeAnalysis(analysis) {
    return {
        weddingSegments: analysis.wedding?.segments.length ?? 0,
        faceClusters: analysis.face?.clusters.length ?? 0,
        emotionClips: analysis.emotion?.clips.length ?? 0,
        cameraClips: analysis.camera?.clips.length ?? 0,
        clipScores: analysis.intelligence?.clips.length ?? 0,
        musicAnalyzed: Boolean(analysis.music)
    };
}
function buildCandidates(clips, analysis, context, intent) {
    return clips
        .filter((clip) => clip.mediaType !== "audio" && clip.type !== "audio")
        .map((clip) => {
        const weddingLabels = (analysis.wedding?.segments ?? [])
            .filter((segment) => clipMatchesId(clip, segment.id) || overlapsSegment(clip, segment))
            .map((segment) => segment.label);
        const faceRoles = (analysis.face?.clusters ?? [])
            .filter((cluster) => cluster.clipIds.some((clipId) => clipMatchesId(clip, clipId)))
            .flatMap((cluster) => [cluster.role, cluster.label]);
        const emotionTags = analysis.emotion?.clips.find((entry) => clipMatchesId(clip, entry.clipId))?.emotions ?? [];
        const shotType = analysis.camera?.clips.find((entry) => clipMatchesId(clip, entry.clipId))?.shotType ?? inferShotTypeFromName(clip.name);
        const technicalScore = normalizeWeight((analysis.intelligence?.clips.find((entry) => clipMatchesId(clip, entry.clipId))?.aiRating ?? 55) / 100);
        const musicEnergy = resolveMusicEnergy(analysis.music, clip, context.duration);
        const selectionScore = scoreClip({
            clip,
            weddingLabels,
            faceRoles,
            emotionTags,
            shotType,
            technicalScore,
            musicEnergy,
            intent
        });
        return {
            ...clip,
            weddingLabels,
            faceRoles,
            emotionTags,
            shotType,
            technicalScore,
            musicEnergy,
            selectionScore
        };
    });
}
function parsePromptIntent(prompt) {
    const text = prompt.toLowerCase();
    const durationMatch = text.match(/(\d+)\s*(?:sec|second|seconds|s)\b/) ??
        text.match(/(\d+)\s*(?:min|minute|minutes|m)\b/);
    const requestedSeconds = durationMatch
        ? durationMatch[0].includes("min")
            ? Number(durationMatch[1]) * 60
            : Number(durationMatch[1])
        : null;
    const promptTags = extractPromptTags(text);
    const energetic = /(mast|energetic|dance|party|sangeet|fast|hype|celebrat)/.test(text);
    const emotional = /(emotional|family|reaction|cry|hug|vidaai|sentimental|soft)/.test(text);
    const familyFocus = /(family|parents|relatives|guests)/.test(text);
    const templateName = matchTemplate(text, requestedSeconds);
    const genericTemplateOnly = promptTags.length === 0 &&
        /(make|bana|create).*(reel|short|highlight|teaser)|\b(reel|highlight|shorts|teaser)\b/.test(text);
    return {
        targetDurationSeconds: requestedSeconds ??
            (0, templates_1.parseDurationSeconds)(resolveTemplate(templateName).targetDuration) ??
            DEFAULT_TARGET_SECONDS,
        templateName,
        summary: buildIntentSummary(promptTags, requestedSeconds, templateName, energetic, emotional, familyFocus),
        focusTags: promptTags,
        promptTags,
        energetic,
        emotional,
        familyFocus,
        genericTemplateOnly
    };
}
function buildIntentSummary(promptTags, requestedSeconds, templateName, energetic, emotional, familyFocus) {
    const parts = [`Template ${templateName}`];
    if (requestedSeconds) {
        parts.push(`${requestedSeconds}s target`);
    }
    if (promptTags.length > 0) {
        parts.push(`focus on ${promptTags.join(", ")}`);
    }
    if (energetic) {
        parts.push("energetic pacing");
    }
    if (emotional) {
        parts.push("emotion-led pacing");
    }
    if (familyFocus) {
        parts.push("family moments");
    }
    return parts.join(" • ");
}
function matchTemplate(text, requestedSeconds) {
    if (/shorts?\b/.test(text)) {
        return "Shorts";
    }
    if (/teaser/.test(text)) {
        return "Teaser";
    }
    if (/highlight/.test(text)) {
        return "Highlight";
    }
    if (/trailer/.test(text)) {
        return "Trailer";
    }
    if (/documentary/.test(text)) {
        return "Documentary";
    }
    if (requestedSeconds !== null && requestedSeconds <= 35) {
        return "Shorts";
    }
    if (requestedSeconds !== null && requestedSeconds <= 50) {
        return "Teaser";
    }
    if (requestedSeconds !== null && requestedSeconds <= 75) {
        return "Reel";
    }
    return "Reel";
}
function resolveTemplate(name) {
    return templates_1.AUTO_EDIT_TEMPLATES.find((template) => template.name === name) ?? templates_1.AUTO_EDIT_TEMPLATES[0];
}
function extractPromptTags(text) {
    const tags = [];
    const map = [
        [/(bride entry|entry shot)/, "Bride Entry"],
        [/(varmala|jaimala)/, "Varmala"],
        [/(pheras|phere)/, "Pheras"],
        [/(vidaai|vidai)/, "Vidaai"],
        [/(family|parents|mother|father)/, "family"],
        [/(reaction|smile|laugh|cry|hug)/, "reaction"],
        [/(dance|sangeet|party)/, "dance"],
        [/(groom)/, "groom"],
        [/(bride)/, "bride"],
        [/(close[- ]?up|detail)/, "detail"],
        [/(drone|wide)/, "wide"]
    ];
    for (const [pattern, label] of map) {
        if (pattern.test(text)) {
            tags.push(label);
        }
    }
    return Array.from(new Set(tags));
}
function scoreClip({ clip, weddingLabels, faceRoles, emotionTags, shotType, technicalScore, musicEnergy, intent }) {
    let score = technicalScore * 0.22 + normalizeWeight(clip.duration / Math.max(intent.targetDurationSeconds, 1)) * 0.08;
    const haystack = [
        clip.name.toLowerCase(),
        weddingLabels.join(" ").toLowerCase(),
        faceRoles.join(" ").toLowerCase(),
        emotionTags.join(" ").toLowerCase(),
        shotType.toLowerCase()
    ].join(" ");
    for (const tag of intent.focusTags) {
        if (haystack.includes(tag.toLowerCase())) {
            score += 0.22;
        }
    }
    if (intent.emotional && emotionTags.some((tag) => ["cry", "hug", "reaction", "smile"].includes(tag))) {
        score += 0.18;
    }
    if (intent.energetic && (emotionTags.includes("dance") || /wide|drone|gimbal/.test(shotType))) {
        score += 0.16;
    }
    if (intent.familyFocus && faceRoles.some((role) => /family|guest/.test(role))) {
        score += 0.14;
    }
    if (musicEnergy > 0.65 && intent.energetic) {
        score += 0.1;
    }
    if (weddingLabels.length === 0 && faceRoles.length === 0 && emotionTags.length === 0) {
        score -= 0.08;
    }
    return score;
}
function deriveWeights(clip, intent) {
    const emotionWeight = normalizeWeight(clip.emotionTags.length > 0
        ? clip.emotionTags.some((tag) => intent.emotional && ["cry", "hug", "reaction", "smile"].includes(tag))
            ? 0.95
            : clip.emotionTags.includes("dance")
                ? 0.8
                : 0.62
        : 0.35);
    const musicEnergyWeight = normalizeWeight(intent.energetic ? clip.musicEnergy : clip.musicEnergy * 0.7);
    const shotWeight = normalizeWeight(/close|detail/.test(clip.shotType) && (intent.emotional || intent.focusTags.includes("detail"))
        ? 0.92
        : /wide|drone/.test(clip.shotType) && intent.energetic
            ? 0.84
            : /gimbal|handheld/.test(clip.shotType)
                ? 0.66
                : 0.48);
    return { emotionWeight, musicEnergyWeight, shotWeight };
}
function buildReason(clip, intent, weights) {
    const reasons = [];
    if (intent.focusTags.some((tag) => clip.weddingLabels.join(" ").toLowerCase().includes(tag.toLowerCase()))) {
        reasons.push(`matches ${clip.weddingLabels.join("/")}`);
    }
    if (intent.familyFocus && clip.faceRoles.some((role) => /family|guest/.test(role))) {
        reasons.push("supports family focus");
    }
    if (intent.emotional && clip.emotionTags.length > 0) {
        reasons.push(`emotional tags ${clip.emotionTags.join(", ")}`);
    }
    if (intent.energetic && clip.musicEnergy > 0.5) {
        reasons.push(`tracks strong music energy (${clip.musicEnergy.toFixed(2)})`);
    }
    reasons.push(`shot type ${clip.shotType}`);
    reasons.push(`duration weighted by emotion ${weights.emotionWeight.toFixed(2)}, music ${weights.musicEnergyWeight.toFixed(2)}, shot ${weights.shotWeight.toFixed(2)}`);
    return reasons.join("; ");
}
function resolveMusicEnergy(music, clip, sequenceDuration) {
    if (!music || music.energyCurve.length === 0 || sequenceDuration <= 0) {
        return 0;
    }
    const midpoint = clip.start + clip.duration / 2;
    const index = Math.max(0, Math.min(music.energyCurve.length - 1, Math.floor((midpoint / sequenceDuration) * music.energyCurve.length)));
    return normalizeWeight(music.energyCurve[index] ?? 0);
}
async function readAllSequenceClips() {
    const timeline = await bridge.readTimeline();
    if (!timeline) {
        return [];
    }
    const clips = [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) => track.clips.map((clip, index) => toBrainClip(track.type, clip, index)));
    return clips;
}
function toBrainClip(trackType, clip, index) {
    return {
        id: buildClipId(clip.name, clip.start, clip.trackIndex, index),
        name: clip.name,
        start: clip.start,
        end: clip.end,
        duration: clip.duration,
        track: clip.trackIndex,
        mediaType: trackType,
        type: trackType,
        projectItemId: clip.projectItemId ?? undefined
    };
}
function applyInOutRange(clips, inPoint, outPoint) {
    if (outPoint <= inPoint) {
        return clips;
    }
    return clips.filter((clip) => clip.end >= inPoint && clip.start <= outPoint);
}
function clipMatchesId(clip, otherId) {
    return canonicalClipId(clip.id) === canonicalClipId(otherId);
}
function canonicalClipId(id) {
    return id.split("::").slice(0, 3).join("::");
}
function overlapsSegment(clip, segment) {
    return clip.end >= segment.start && clip.start <= segment.end;
}
function inferShotTypeFromName(name) {
    const text = name.toLowerCase();
    if (/(drone|wide)/.test(text)) {
        return "wide";
    }
    if (/(close|detail|macro)/.test(text)) {
        return "detail";
    }
    if (/(gimbal|steady)/.test(text)) {
        return "gimbal";
    }
    if (/(handheld|cam)/.test(text)) {
        return "handheld";
    }
    return "unknown";
}
function buildClipId(name, start, track, index) {
    return `${name}::${track}::${start.toFixed(3)}::${index}`;
}
function clampDuration(sourceDuration, requestedDuration, minimumDuration = STANDARD_MIN_CLIP_DURATION_SECONDS) {
    const safeMinimum = Math.max(0, minimumDuration);
    const safeSourceDuration = Number.isFinite(sourceDuration) ? Math.max(0, sourceDuration) : 0;
    const maxDuration = Math.max(safeMinimum, safeSourceDuration);
    return Math.max(safeMinimum, Math.min(maxDuration, requestedDuration));
}
function normalizeWeight(value) {
    if (!Number.isFinite(value)) {
        return 0;
    }
    return Math.max(0, Math.min(1, value));
}
function hashText(value) {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
        hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
    }
    return hash.toString(16);
}


/***/ },

/***/ 2394
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ReferenceAnalyzer = void 0;
const AICopilot_1 = __webpack_require__(318);
const GeminiService_1 = __webpack_require__(5449);
const generative_ai_1 = __webpack_require__(6445);
const copilot = new AICopilot_1.AICopilot();
const referenceProfileSchema = {
    type: generative_ai_1.SchemaType.OBJECT,
    properties: {
        cutPacing: { type: generative_ai_1.SchemaType.STRING },
        storyStructure: { type: generative_ai_1.SchemaType.STRING },
        motion: { type: generative_ai_1.SchemaType.STRING },
        effects: { type: generative_ai_1.SchemaType.STRING },
        fonts: { type: generative_ai_1.SchemaType.STRING },
        musicMood: { type: generative_ai_1.SchemaType.STRING },
        colorGrade: { type: generative_ai_1.SchemaType.STRING },
        summary: { type: generative_ai_1.SchemaType.STRING }
    },
    required: ["cutPacing", "storyStructure", "motion", "effects", "fonts", "musicMood", "colorGrade", "summary"]
};
class ReferenceAnalyzer {
    async analyze(input) {
        if (input.startsWith("http://") || input.startsWith("https://")) {
            const resolved = await copilot.resolve({
                intent: "reference-ai:analyze",
                context: { input },
                memoryScopeKey: `reference-ai:${input}`,
                memoryCacheKey: "result",
                geminiResolver: async () => (0, GeminiService_1.runGeminiStructured)(`Analyze the following video content from ${input} for cut pacing, story structure, motion, effects, fonts, music mood, and color grade.`, referenceProfileSchema)
            });
            return {
                ...resolved.value,
                signalSource: `URL: ${input}`,
                resolutionPath: resolved.path
            };
        }
        else {
            return {
                summary: "Local file style analysis requires extracted frames plus a Gemini Vision request. That execution path is not wired in this workspace yet, so only URL text analysis is currently available.",
                signalSource: `Local File: ${input}`,
                requiresManualFrameExtraction: true
            };
        }
    }
}
exports.ReferenceAnalyzer = ReferenceAnalyzer;


/***/ },

/***/ 9255
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = ReferenceAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const AutoEditAssembler_1 = __webpack_require__(5336);
const ReferenceAnalyzer_1 = __webpack_require__(2394);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
function ReferenceAIScreen() {
    const [inputSource, setInputSource] = (0, react_1.useState)("");
    const [analysisResult, setAnalysisResult] = (0, react_1.useState)(null);
    const [isAnalyzing, setIsAnalyzing] = (0, react_1.useState)(false);
    const [signalSourceUsed, setSignalSourceUsed] = (0, react_1.useState)("");
    async function handleAnalyze() {
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setSignalSourceUsed("");
        try {
            const analyzer = new ReferenceAnalyzer_1.ReferenceAnalyzer();
            const result = await analyzer.analyze(inputSource);
            setAnalysisResult(result);
            if (!result.error) {
                setSignalSourceUsed(String(result.signalSource ||
                    (inputSource.startsWith("http") ? `URL: ${inputSource}` : `Local File: ${inputSource}`)));
            }
        }
        finally {
            setIsAnalyzing(false);
        }
    }
    async function handleRecreateStyle() {
        try {
            const assembler = new AutoEditAssembler_1.AutoEditAssembler();
            const result = await assembler.assemble("Reel", [], analysisResult ?? undefined);
            alert(result);
        }
        catch (error) {
            alert(error instanceof Error ? error.message : "Failed to recreate style.");
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Reference AI", subtitle: "Analyze a reel or source clip and map its storytelling signature into RK Flow.", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "reference-ai-source", style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: "Source URL or media path" }), (0, jsx_runtime_1.jsx)("input", { id: "reference-ai-source", type: "text", value: inputSource, onChange: (event) => setInputSource(event.target.value), placeholder: "Instagram Reel, YouTube URL, or local file path", style: {
                                    width: "100%",
                                    boxSizing: "border-box",
                                    borderRadius: 10,
                                    border: `1px solid ${theme_1.colors.border}`,
                                    background: theme_1.colors.white,
                                    color: theme_1.colors.ink,
                                    padding: "10px 12px"
                                } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.md, flexWrap: "wrap", marginTop: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: isAnalyzing ? "Analyzing" : "Ready", tone: isAnalyzing ? "warning" : "success" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void handleAnalyze(), disabled: isAnalyzing || inputSource.trim().length === 0, children: isAnalyzing ? "Analyzing..." : "Analyze Reference" })] }), signalSourceUsed && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted }, children: ["Signal source used: ", (0, jsx_runtime_1.jsx)("strong", { children: signalSourceUsed })] }))] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Style Profile Card", subtitle: "Structured output from the Phase 3 reference analysis path.", children: !analysisResult ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "Run an analysis to inspect the generated style profile and recreate it with Auto Edit." })) : analysisResult.error ? ((0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.danger }, children: ["Error: ", String(analysisResult.error)] })) : ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [Object.entries(analysisResult).map(([key, value]) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                borderRadius: 10,
                                border: `1px solid ${theme_1.colors.border}`,
                                background: theme_1.colors.white,
                                padding: theme_1.spacing.sm
                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()) }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, marginTop: theme_1.spacing.xs, wordBreak: "break-word" }, children: typeof value === "string" ? value : JSON.stringify(value) })] }, key))), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void handleRecreateStyle(), children: "Recreate This Style" }) })] })) })] }));
}


/***/ },

/***/ 3094
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = TeamWorkspaceScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const PremiereBridge_1 = __webpack_require__(1862);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const teamWorkspaceStore_1 = __webpack_require__(9347);
const bridge = new PremiereBridge_1.PremiereBridge();
const STATUSES = ["Pending", "Approved", "Changes Requested"];
function TeamWorkspaceScreen() {
    const [timeline, setTimeline] = (0, react_1.useState)(null);
    const [commentText, setCommentText] = (0, react_1.useState)("");
    const [author, setAuthor] = (0, react_1.useState)("Rohit");
    const [selectedClipId, setSelectedClipId] = (0, react_1.useState)("");
    const [workspace, setWorkspace] = (0, react_1.useState)((0, teamWorkspaceStore_1.loadWorkspace)());
    const [versionNote, setVersionNote] = (0, react_1.useState)("");
    const [versionStatus, setVersionStatus] = (0, react_1.useState)("Pending");
    const [selectedCompareIds, setSelectedCompareIds] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        void bridge.readTimeline().then((next) => setTimeline(next));
    }, []);
    const sequenceKey = timeline?.sequenceName || "No active sequence";
    const allClips = (0, react_1.useMemo)(() => [...(timeline?.videoTracks ?? []), ...(timeline?.audioTracks ?? [])].flatMap((track) => track.clips.map((clip) => ({
        ...clip,
        compoundId: `${track.type}:${track.id}:${clip.id}`,
        label: `${clip.name} • ${track.name} • ${clip.start.toFixed(2)}s-${clip.end.toFixed(2)}s`
    }))), [timeline]);
    const comments = workspace.comments.filter((comment) => comment.sequenceKey === sequenceKey);
    const versions = workspace.versions.filter((version) => version.sequenceKey === sequenceKey);
    const comparison = (0, react_1.useMemo)(() => {
        if (selectedCompareIds.length !== 2) {
            return null;
        }
        const left = versions.find((version) => version.id === selectedCompareIds[0]);
        const right = versions.find((version) => version.id === selectedCompareIds[1]);
        return left && right ? { left, right, diff: (0, teamWorkspaceStore_1.compareVersions)(left, right) } : null;
    }, [selectedCompareIds, versions]);
    function refreshWorkspace() {
        setWorkspace((0, teamWorkspaceStore_1.loadWorkspace)());
    }
    function submitComment() {
        if (!selectedClipId || !commentText.trim()) {
            return;
        }
        (0, teamWorkspaceStore_1.saveComment)({
            sequenceKey,
            clipId: selectedClipId,
            author: author.trim() || "Reviewer",
            text: commentText.trim(),
            status: "Pending"
        });
        setCommentText("");
        refreshWorkspace();
    }
    function snapshotVersion() {
        if (!timeline) {
            return;
        }
        (0, teamWorkspaceStore_1.saveVersion)({
            sequenceKey,
            sequenceName: timeline.sequenceName,
            status: versionStatus,
            note: versionNote.trim(),
            snapshot: timeline
        });
        setVersionNote("");
        setVersionStatus("Pending");
        refreshWorkspace();
    }
    function toggleCompare(versionId) {
        setSelectedCompareIds((current) => {
            if (current.includes(versionId)) {
                return current.filter((id) => id !== versionId);
            }
            if (current.length === 2) {
                return [current[1], versionId];
            }
            return [...current, versionId];
        });
    }
    const exportJson = JSON.stringify((0, teamWorkspaceStore_1.buildReviewExport)(sequenceKey), null, 2);
    const exportMarkdown = (0, teamWorkspaceStore_1.buildReviewMarkdown)(sequenceKey);
    if (!timeline) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Team Workspace", children: "Open a sequence to review comments and save local versions." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Team Workspace", subtitle: "LOCAL-ONLY review data stored in MemoryEngine. No real-time sync or shared backend is configured.", children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Sequence ${timeline.sequenceName}`, tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `${allClips.length} clips in snapshot` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Local-only collaboration", tone: "warning" })] }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md, alignItems: "flex-start" }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Comments", subtitle: "Thread comments against current timeline clips.", style: { flex: "1 1 420px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Input, { placeholder: "Reviewer name", value: author, onChange: (event) => setAuthor(event.target.value) }), (0, jsx_runtime_1.jsxs)("select", { value: selectedClipId, onChange: (event) => setSelectedClipId(event.target.value), style: {
                                            width: "100%",
                                            boxSizing: "border-box",
                                            borderRadius: 10,
                                            border: `1px solid ${theme_1.colors.border}`,
                                            background: theme_1.colors.white,
                                            color: theme_1.colors.ink,
                                            padding: "10px 12px"
                                        }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select clip" }), allClips.map((clip) => ((0, jsx_runtime_1.jsx)("option", { value: clip.compoundId, children: clip.label }, clip.compoundId)))] }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { multiline: true, rows: 4, placeholder: "Add a review note...", value: commentText, onChange: (event) => setCommentText(event.target.value) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: submitComment, disabled: !selectedClipId || !commentText.trim(), children: "Save Comment" })] }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm, marginTop: theme_1.spacing.md }, children: comments.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "No comments saved for this sequence yet." })) : (comments.map((comment) => ((0, jsx_runtime_1.jsx)(CommentCard, { comment: comment, onStatusChange: (status) => {
                                        (0, teamWorkspaceStore_1.updateCommentStatus)(comment.id, status);
                                        refreshWorkspace();
                                    } }, comment.id)))) })] }), (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Version History", subtitle: "Save and compare local snapshots of the current sequence structure.", style: { flex: "1 1 420px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)("select", { value: versionStatus, onChange: (event) => setVersionStatus(event.target.value), style: {
                                            width: "100%",
                                            boxSizing: "border-box",
                                            borderRadius: 10,
                                            border: `1px solid ${theme_1.colors.border}`,
                                            background: theme_1.colors.white,
                                            color: theme_1.colors.ink,
                                            padding: "10px 12px"
                                        }, children: STATUSES.map((status) => ((0, jsx_runtime_1.jsx)("option", { value: status, children: status }, status))) }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { placeholder: "Optional version note", value: versionNote, onChange: (event) => setVersionNote(event.target.value) }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: snapshotVersion, children: "Save Version Snapshot" })] }), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm, marginTop: theme_1.spacing.md }, children: versions.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "No local versions saved yet." })) : (versions.map((version) => ((0, jsx_runtime_1.jsx)(VersionCard, { version: version, checked: selectedCompareIds.includes(version.id), onCompareToggle: () => toggleCompare(version.id), onStatusChange: (status) => {
                                        (0, teamWorkspaceStore_1.updateVersionStatus)(version.id, status);
                                        refreshWorkspace();
                                    } }, version.id)))) })] })] }), (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Review Mode Export", subtitle: "Portable summary output for another editor to import locally.", children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, marginBottom: theme_1.spacing.md }, children: "This is a static local export only. No live shared session or sync transport exists in this repo today." }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: "1 1 320px" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700, marginBottom: theme_1.spacing.xs }, children: "JSON" }), (0, jsx_runtime_1.jsx)("pre", { style: exportStyle, children: exportJson })] }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: "1 1 320px" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700, marginBottom: theme_1.spacing.xs }, children: "Markdown" }), (0, jsx_runtime_1.jsx)("pre", { style: exportStyle, children: exportMarkdown })] })] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Version Compare", subtitle: "Diff the clip structure between two saved local versions.", children: !comparison ? ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: "Select two versions above to compare them." })) : ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: [comparison.left.createdAt, " \u2192 ", comparison.right.createdAt] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: ["Clip count: ", comparison.diff.leftClipCount, " \u2192 ", comparison.diff.rightClipCount] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: ["Added: ", comparison.diff.added.length ? comparison.diff.added.join(", ") : "None"] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted }, children: ["Removed: ", comparison.diff.removed.length ? comparison.diff.removed.join(", ") : "None"] })] })) })] }));
}
function CommentCard({ comment, onStatusChange }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: boxStyle, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: comment.author }), (0, jsx_runtime_1.jsx)(StatusPicker, { value: comment.status, onChange: onStatusChange })] }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, marginTop: theme_1.spacing.xs }, children: comment.clipId }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.sm }, children: comment.text })] }));
}
function VersionCard({ version, checked, onCompareToggle, onStatusChange }) {
    const clipCount = [...version.snapshot.videoTracks, ...version.snapshot.audioTracks].reduce((count, track) => count + track.clips.length, 0);
    return ((0, jsx_runtime_1.jsxs)("div", { style: boxStyle, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.sm, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: [version.sequenceName, " \u2022 ", new Date(version.createdAt).toLocaleString()] }), (0, jsx_runtime_1.jsx)(StatusPicker, { value: version.status, onChange: onStatusChange })] }), (0, jsx_runtime_1.jsxs)("div", { style: { color: theme_1.colors.inkMuted, marginTop: theme_1.spacing.xs }, children: [clipCount, " clips \u2022 ", version.note || "No note"] }), (0, jsx_runtime_1.jsxs)("label", { style: { display: "inline-flex", alignItems: "center", gap: theme_1.spacing.xs, marginTop: theme_1.spacing.sm }, children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: checked, onChange: onCompareToggle }), "Compare"] })] }));
}
function StatusPicker({ value, onChange }) {
    return ((0, jsx_runtime_1.jsx)("select", { value: value, onChange: (event) => onChange(event.target.value), style: {
            borderRadius: 10,
            border: `1px solid ${theme_1.colors.border}`,
            background: theme_1.colors.white,
            color: theme_1.colors.ink,
            padding: "6px 10px"
        }, children: STATUSES.map((status) => ((0, jsx_runtime_1.jsx)("option", { value: status, children: status }, status))) }));
}
const boxStyle = {
    border: `1px solid ${theme_1.colors.border}`,
    borderRadius: 10,
    background: theme_1.colors.white,
    padding: theme_1.spacing.sm
};
const exportStyle = {
    background: theme_1.colors.white,
    border: `1px solid ${theme_1.colors.border}`,
    borderRadius: 10,
    padding: theme_1.spacing.sm,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: 240,
    overflow: "auto"
};


/***/ },

/***/ 9347
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.loadWorkspace = loadWorkspace;
exports.saveComment = saveComment;
exports.updateCommentStatus = updateCommentStatus;
exports.saveVersion = saveVersion;
exports.updateVersionStatus = updateVersionStatus;
exports.buildReviewExport = buildReviewExport;
exports.buildReviewMarkdown = buildReviewMarkdown;
exports.compareVersions = compareVersions;
const brain_1 = __webpack_require__(7021);
const memory = new brain_1.MemoryEngine();
const SCOPE = "team-workspace";
const KEY = "local-review";
function loadWorkspace() {
    return (memory.getAnalysis(SCOPE, KEY) ?? {
        comments: [],
        versions: []
    });
}
function saveComment(comment) {
    const snapshot = loadWorkspace();
    snapshot.comments = [
        {
            ...comment,
            id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
            createdAt: new Date().toISOString()
        },
        ...snapshot.comments
    ];
    persist(snapshot);
}
function updateCommentStatus(commentId, status) {
    const snapshot = loadWorkspace();
    snapshot.comments = snapshot.comments.map((comment) => comment.id === commentId ? { ...comment, status } : comment);
    persist(snapshot);
}
function saveVersion(args) {
    const workspace = loadWorkspace();
    workspace.versions = [
        {
            id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
            ...args,
            createdAt: new Date().toISOString()
        },
        ...workspace.versions
    ];
    persist(workspace);
}
function updateVersionStatus(versionId, status) {
    const snapshot = loadWorkspace();
    snapshot.versions = snapshot.versions.map((version) => version.id === versionId ? { ...version, status } : version);
    persist(snapshot);
}
function buildReviewExport(sequenceKey) {
    const snapshot = loadWorkspace();
    return {
        exportedAt: new Date().toISOString(),
        localOnly: true,
        sequenceKey,
        comments: snapshot.comments.filter((comment) => comment.sequenceKey === sequenceKey),
        versions: snapshot.versions.filter((version) => version.sequenceKey === sequenceKey)
    };
}
function buildReviewMarkdown(sequenceKey) {
    const data = buildReviewExport(sequenceKey);
    const lines = [
        "# RK Flow Team Workspace Review",
        "",
        `Sequence Key: ${sequenceKey}`,
        `Exported At: ${data.exportedAt}`,
        "Mode: LOCAL-ONLY (no real-time sync)",
        "",
        "## Comments"
    ];
    if (data.comments.length === 0) {
        lines.push("- None");
    }
    else {
        for (const comment of data.comments) {
            lines.push(`- [${comment.status}] ${comment.author} on ${comment.clipId}: ${comment.text}`);
        }
    }
    lines.push("", "## Versions");
    if (data.versions.length === 0) {
        lines.push("- None");
    }
    else {
        for (const version of data.versions) {
            lines.push(`- [${version.status}] ${version.sequenceName} @ ${version.createdAt} (${flattenClipCount(version.snapshot)} clips)${version.note ? ` — ${version.note}` : ""}`);
        }
    }
    return lines.join("\n");
}
function compareVersions(left, right) {
    const leftIds = flattenClipIds(left.snapshot);
    const rightIds = flattenClipIds(right.snapshot);
    return {
        added: rightIds.filter((id) => !leftIds.includes(id)),
        removed: leftIds.filter((id) => !rightIds.includes(id)),
        leftClipCount: leftIds.length,
        rightClipCount: rightIds.length
    };
}
function flattenClipIds(snapshot) {
    return [...snapshot.videoTracks, ...snapshot.audioTracks].flatMap((track) => track.clips.map((clip) => `${track.type}:${track.id}:${clip.id}:${clip.start.toFixed(3)}:${clip.end.toFixed(3)}`));
}
function flattenClipCount(snapshot) {
    return flattenClipIds(snapshot).length;
}
function persist(snapshot) {
    memory.setAnalysis(SCOPE, KEY, snapshot);
}


/***/ },

/***/ 3658
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ConfirmActionModal = ConfirmActionModal;
const jsx_runtime_1 = __webpack_require__(4848);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
function ConfirmActionModal({ issue, onConfirm, onCancel }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
        }, children: (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: `Confirm: ${issue.title}`, children: [(0, jsx_runtime_1.jsx)("p", { style: { color: theme_1.colors.ink, margin: `0 0 ${theme_1.spacing.md} 0` }, children: issue.detail }), (0, jsx_runtime_1.jsx)("p", { style: { color: theme_1.colors.inkMuted, margin: `0 0 ${theme_1.spacing.lg} 0` }, children: "Are you sure you want to apply this fix? This action can be undone with Ctrl+Z." }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.sm, justifyContent: "flex-end" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: onCancel, children: "Cancel" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: onConfirm, children: "Confirm" })] })] }) }));
}


/***/ },

/***/ 5760
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.TimelineAIExecution = void 0;
const Command_1 = __webpack_require__(111);
const TimelineReader_1 = __webpack_require__(824);
const PremiereBridge_1 = __webpack_require__(1862);
const PremiereExecutor_1 = __webpack_require__(7365);
function formatFailures(results) {
    return results
        .filter((result) => !result.success)
        .map((result) => result.error ?? "Unknown execution failure.")
        .join(" ");
}
class TimelineAIExecution {
    executor = new PremiereExecutor_1.PremiereExecutor();
    timelineReader = new TimelineReader_1.TimelineReader(new PremiereBridge_1.PremiereBridge());
    async autoTrim() {
        const clips = await this.getSelectedVideoClips();
        const results = clips.length > 0
            ? await this.executor.runBatch(clips.map((clip) => (0, Command_1.createCommand)("AUTO_TRIM", {
                clipId: clip.id,
                start: clip.start,
                end: clip.end
            })))
            : [await this.executor.runAction("AUTO_TRIM")];
        return summarize("Auto Trim", results);
    }
    async beatCut() {
        const clips = await this.getSelectedVideoClips();
        const results = clips.length > 0
            ? await this.executor.runBatch(clips.map((clip) => (0, Command_1.createCommand)("BEAT_CUT", { clipId: clip.id, start: clip.start, end: clip.end })))
            : [await this.executor.runAction("BEAT_CUT")];
        return summarize("Beat Cut", results);
    }
    async silenceRemove() {
        const clips = await this.getSelectedAudioClips();
        const results = clips.length > 0
            ? await this.executor.runBatch(clips.map((clip) => (0, Command_1.createCommand)("SILENCE_REMOVE", {
                clipId: clip.id,
                start: clip.start,
                end: clip.end
            })))
            : [await this.executor.runAction("SILENCE_REMOVE")];
        return summarize("Silence Remove", results);
    }
    async gapRemove(gaps) {
        const ranges = gaps && gaps.length > 0 ? gaps : await this.getRangeFromInOut();
        const results = await this.executor.runBatch(ranges.map((gap) => (0, Command_1.createCommand)("RIPPLE_DELETE", gap)));
        return summarize("Gap Remove", results);
    }
    async rippleDelete(start, end) {
        const fallback = await this.getRangeFromInOut();
        const range = start !== undefined && end !== undefined ? [{ start, end }] : fallback;
        const results = await this.executor.runBatch(range.map((item) => (0, Command_1.createCommand)("RIPPLE_DELETE", item)));
        return summarize("Ripple Delete", results);
    }
    async speedRamp(from = 100, to = 180) {
        const clips = await this.getSelectedVideoClips();
        const results = await this.executor.runBatch(clips.map((clip) => (0, Command_1.createCommand)("SPEED_RAMP", { clipId: clip.id, from, to })));
        return summarize("Speed Ramp", results, clips.length === 0);
    }
    async autoZoom(start = 0, end = 1) {
        const clips = await this.getSelectedVideoClips();
        const results = await this.executor.runBatch(clips.map((clip) => (0, Command_1.createCommand)("AUTO_ZOOM", { clipId: clip.id, start, end })));
        return summarize("Auto Zoom", results, clips.length === 0);
    }
    async reframe() {
        const clips = await this.getSelectedVideoClips();
        const results = await this.executor.runBatch(clips.map((clip) => (0, Command_1.createCommand)("REFRAME", { clipId: clip.id })));
        return summarize("Reframe", results, clips.length === 0);
    }
    async getSelectedVideoClips() {
        const clips = await this.timelineReader.getSelectedClips();
        return clips.filter((clip) => clip.trackIndex >= 0);
    }
    async getSelectedAudioClips() {
        return this.timelineReader.getSelectedClips();
    }
    async getRangeFromInOut() {
        const range = await this.timelineReader.getInOut();
        if (range === null || range.inPoint >= range.outPoint) {
            return [];
        }
        return [{ start: range.inPoint, end: range.outPoint }];
    }
}
exports.TimelineAIExecution = TimelineAIExecution;
function summarize(label, results, missingSelection = false) {
    if (missingSelection) {
        return `${label} requires a selected clip or a valid In/Out range in Premiere.`;
    }
    if (results.length === 0) {
        return `${label} requires a selected clip or a valid In/Out range in Premiere.`;
    }
    const failures = formatFailures(results);
    if (failures.length > 0) {
        return `${label} submitted with ${results.length} action(s), but Premiere reported: ${failures}`;
    }
    return `${label} submitted to Premiere with ${results.length} action(s).`;
}


/***/ },

/***/ 4667
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = TimelineAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const brain_1 = __webpack_require__(7021);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const perceptionAnalyzers_1 = __webpack_require__(990);
const useSequenceAnalysis_1 = __webpack_require__(8936);
const ConfirmActionModal_1 = __webpack_require__(3658);
const TimelineAIExecution_1 = __webpack_require__(5760);
const memory = new brain_1.MemoryEngine();
const timelineExecution = new TimelineAIExecution_1.TimelineAIExecution();
function TimelineAIScreen() {
    const [confirmingIssue, setConfirmingIssue] = (0, react_1.useState)(null);
    const { context, result, loading, progress, error, reanalyze } = (0, useSequenceAnalysis_1.useSequenceAnalysis)({
        moduleId: "timeline-ai",
        analyze: async (sequenceContext, onProgress) => {
            const cachedClipScores = memory.getAnalysis(`clip-intelligence:${sequenceContext.sequenceKey}`, "result");
            const clipScores = cachedClipScores?.clips ??
                (await (0, perceptionAnalyzers_1.analyzeClipIntelligence)(sequenceContext, onProgress)).clips;
            return (0, perceptionAnalyzers_1.analyzeTimelineHealth)(sequenceContext, clipScores, onProgress);
        },
    });
    const healthTone = (0, react_1.useMemo)(() => {
        if (!result) {
            return "neutral";
        }
        return result.score >= 75
            ? "success"
            : result.score >= 45
                ? "warning"
                : "danger";
    }, [result]);
    const handlePreviewFix = (issue) => {
        // For now, we directly show the confirmation.
        // A future step could highlight the area on the timeline first.
        setConfirmingIssue(issue);
    };
    const handleCancelConfirm = () => {
        setConfirmingIssue(null);
    };
    const handleConfirmFix = async () => {
        if (!confirmingIssue)
            return;
        if (confirmingIssue.id === "gaps") {
            const gaps = confirmingIssue.payload;
            await timelineExecution.gapRemove(gaps);
        }
        setConfirmingIssue(null);
        // In a real app, we'd show a toast here.
        // And ideally, re-run the analysis.
        reanalyze();
    };
    if (!context) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Timeline AI", children: "Open a sequence to analyze." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [confirmingIssue && ((0, jsx_runtime_1.jsx)(ConfirmActionModal_1.ConfirmActionModal, { issue: confirmingIssue, onConfirm: handleConfirmFix, onCancel: handleCancelConfirm })), (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Timeline AI", subtitle: result?.source ?? "Read-only analysis", children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                            display: "flex",
                            justifyContent: "space-between",
                            gap: theme_1.spacing.sm,
                            flexWrap: "wrap",
                        }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: result ? `Health ${result.score}` : "No score yet", tone: healthTone }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void reanalyze(), disabled: loading, children: "Re-analyze" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.autoTrim(), style: { marginRight: theme_1.spacing.sm }, children: "Auto Trim" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.beatCut(), style: { marginRight: theme_1.spacing.sm }, children: "Beat Cut" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.silenceRemove(), style: { marginRight: theme_1.spacing.sm }, children: "Silence Remove" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.gapRemove(), style: { marginRight: theme_1.spacing.sm }, children: "Gap Remove" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.rippleDelete(), style: { marginRight: theme_1.spacing.sm }, children: "Ripple Delete" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.speedRamp(), style: { marginRight: theme_1.spacing.sm }, children: "Speed Ramp" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.autoZoom(), style: { marginRight: theme_1.spacing.sm }, children: "Auto Zoom" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => void timelineExecution.reframe(), children: "Reframe" })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            marginTop: theme_1.spacing.md,
                            color: error ? theme_1.colors.danger : theme_1.colors.inkMuted,
                        }, children: [loading && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progress.percent, label: `${progress.completed}/${progress.total} steps` }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: loading ? theme_1.spacing.xs : 0 }, children: error || progress.label })] }), result && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted }, children: ["Formula: ", result.formula] }))] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Issues Found", children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: (result?.issues ?? []).map((issue) => {
                        const isFixable = issue.id === "gaps"; // Only gaps are fixable for now
                        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                border: `1px solid ${theme_1.colors.border}`,
                                borderRadius: 10,
                                padding: theme_1.spacing.sm,
                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: issue.title }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, marginTop: theme_1.spacing.xs }, children: issue.detail }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => handlePreviewFix(issue), disabled: !isFixable || loading, title: isFixable ? "Fix this issue" : "Auto-fix not available for this issue type", children: "Preview Fix" }) })] }, issue.id));
                    }) }) })] }));
}


/***/ },

/***/ 5522
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = WeddingAIScreen;
const jsx_runtime_1 = __webpack_require__(4848);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const perceptionAnalyzers_1 = __webpack_require__(990);
const useSequenceAnalysis_1 = __webpack_require__(8936);
function WeddingAIScreen() {
    const { context, result, loading, progress, error, reanalyze } = (0, useSequenceAnalysis_1.useSequenceAnalysis)({
        moduleId: "wedding-ai",
        analyze: perceptionAnalyzers_1.analyzeWeddingSegments
    });
    const segments = (result?.segments ?? []).map((segment) => normalizeSegmentForRender(segment));
    if (!context) {
        return (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Wedding AI", children: "Open a sequence to analyze." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Wedding AI", subtitle: result?.source ?? "Timeline metadata analysis", children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.md, flexWrap: "wrap" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: loading ? "Analyzing..." : `${result?.segments.length ?? 0} segments`, tone: loading ? "warning" : "success" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: () => void reanalyze(), disabled: loading, children: "Re-analyze" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: theme_1.spacing.md, display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: [loading && (0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: progress.percent, label: `${progress.completed}/${progress.total} steps` }), (0, jsx_runtime_1.jsx)("div", { style: { color: error ? theme_1.colors.danger : theme_1.colors.inkMuted }, children: error || progress.label })] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Event Timeline", children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", gap: 2, minHeight: 52, overflow: "hidden", borderRadius: 10 }, children: segments.map((segment) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", style: {
                            flex: `${Math.max(segment.end - segment.start, 0.5)} 0 auto`,
                            border: "none",
                            background: segment.confidence >= 0.75 ? theme_1.colors.maroon : theme_1.colors.gold,
                            color: theme_1.colors.white,
                            padding: theme_1.spacing.sm,
                            textAlign: "left",
                            cursor: "pointer"
                        }, title: `${segment.label} • ${(segment.confidence * 100).toFixed(0)}% • ${segment.start.toFixed(1)}s-${segment.end.toFixed(1)}s`, children: [(0, jsx_runtime_1.jsx)("div", { children: segment.label }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: 12 }, children: [(segment.confidence * 100).toFixed(0), "%"] })] }, segment.id))) }) })] }));
}
function normalizeSegmentForRender(segment) {
    const start = normalizeTimingValue(segment.start, `${segment.id}:start`);
    const end = normalizeTimingValue(segment.end, `${segment.id}:end`);
    return {
        ...segment,
        start,
        end: end >= start ? end : start
    };
}
function normalizeTimingValue(value, label) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (value && typeof value === "object" && "seconds" in value) {
        const secondsValue = value.seconds;
        if (typeof secondsValue === "number" && Number.isFinite(secondsValue)) {
            console.warn("[RK Flow] WeddingAIScreen received TickTime-like segment timing.", {
                field: label,
                type: typeof value,
                value
            });
            return secondsValue;
        }
    }
    console.warn("[RK Flow] WeddingAIScreen received non-numeric segment timing.", {
        field: label,
        type: typeof value,
        value
    });
    return 0;
}


/***/ },

/***/ 3900
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const client_1 = __importDefault(__webpack_require__(5338));
const App_1 = __importDefault(__webpack_require__(8577));
const root = document.getElementById("root");
if (!root) {
    document.body.innerHTML = "<h1 style='color:red'>ROOT NOT FOUND</h1>";
}
else {
    client_1.default.createRoot(root).render((0, jsx_runtime_1.jsx)(App_1.default, {}));
}


/***/ },

/***/ 7664
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = AppShell;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const AIChatPanel_1 = __importDefault(__webpack_require__(602));
const LearnStyleComponent_1 = __importDefault(__webpack_require__(7689));
const AutoEditComponent_1 = __importDefault(__webpack_require__(1161));
const ColorAIComponent_1 = __importDefault(__webpack_require__(8947));
const MotionAIComponent_1 = __importDefault(__webpack_require__(4038));
const AudioAIComponent_1 = __importDefault(__webpack_require__(4198));
const CaptionAIComponent_1 = __importDefault(__webpack_require__(4238));
const brain_1 = __webpack_require__(7021);
const auto_reel_1 = __importDefault(__webpack_require__(4251));
const ai_director_1 = __importDefault(__webpack_require__(7896));
const analytics_1 = __importDefault(__webpack_require__(3675));
const asset_ai_1 = __importDefault(__webpack_require__(6830));
const camera_ai_1 = __importDefault(__webpack_require__(5187));
const clip_intelligence_1 = __importDefault(__webpack_require__(2917));
const emotion_ai_1 = __importDefault(__webpack_require__(6175));
const export_ai_1 = __importDefault(__webpack_require__(3254));
const face_ai_1 = __importDefault(__webpack_require__(9209));
const developer_center_1 = __importDefault(__webpack_require__(3453));
const music_ai_1 = __importDefault(__webpack_require__(6609));
const prompt_reel_1 = __importDefault(__webpack_require__(2232));
const reference_ai_1 = __importDefault(__webpack_require__(9255));
const SettingsPage_1 = __importDefault(__webpack_require__(1742));
const timeline_ai_1 = __importDefault(__webpack_require__(4667));
const team_workspace_1 = __importDefault(__webpack_require__(3094));
const wedding_ai_1 = __importDefault(__webpack_require__(5522));
const premiereService_1 = __webpack_require__(3763);
const systemStats_1 = __webpack_require__(1125);
const ExecutionPreviewModal_1 = __importDefault(__webpack_require__(1257));
const ErrorBoundary_1 = __importDefault(__webpack_require__(560));
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const activity_mjs_1 = __importDefault(__webpack_require__(7720));
const aperture_mjs_1 = __importDefault(__webpack_require__(2731));
const audio_lines_mjs_1 = __importDefault(__webpack_require__(5337));
const badge_indian_rupee_mjs_1 = __importDefault(__webpack_require__(4288));
const bot_mjs_1 = __importDefault(__webpack_require__(622));
const camera_mjs_1 = __importDefault(__webpack_require__(6666));
const captions_mjs_1 = __importDefault(__webpack_require__(7937));
const clapperboard_mjs_1 = __importDefault(__webpack_require__(7146));
const download_mjs_1 = __importDefault(__webpack_require__(7379));
const film_mjs_1 = __importDefault(__webpack_require__(6913));
const folder_kanban_mjs_1 = __importDefault(__webpack_require__(3705));
const heart_handshake_mjs_1 = __importDefault(__webpack_require__(5905));
const layout_dashboard_mjs_1 = __importDefault(__webpack_require__(2654));
const mic_vocal_mjs_1 = __importDefault(__webpack_require__(1696));
const monitor_cog_mjs_1 = __importDefault(__webpack_require__(5205));
const music_4_mjs_1 = __importDefault(__webpack_require__(307));
const palette_mjs_1 = __importDefault(__webpack_require__(5832));
const scan_face_mjs_1 = __importDefault(__webpack_require__(7002));
const scissors_mjs_1 = __importDefault(__webpack_require__(5758));
const settings_mjs_1 = __importDefault(__webpack_require__(3588));
const sparkles_mjs_1 = __importDefault(__webpack_require__(5654));
const timer_reset_mjs_1 = __importDefault(__webpack_require__(692));
const users_mjs_1 = __importDefault(__webpack_require__(1085));
const waves_horizontal_mjs_1 = __importDefault(__webpack_require__(9404));
const appShellLayout_1 = __webpack_require__(1746);
const MODULE_GROUPS = [
    {
        label: "AI Core",
        items: [
            { id: "dashboard", title: "Dashboard", phase: 1, icon: (0, jsx_runtime_1.jsx)(layout_dashboard_mjs_1.default, { size: 16 }), description: "Studio overview and project pulse." },
            { id: "ai-director", title: "AI Director", phase: 3, icon: (0, jsx_runtime_1.jsx)(bot_mjs_1.default, { size: 16 }), description: "Full autonomous wedding-film creation." },
            { id: "reference-ai", title: "Reference AI", phase: 3, icon: (0, jsx_runtime_1.jsx)(film_mjs_1.default, { size: 16 }), description: "Analyze reels and recreate style." }
        ]
    },
    {
        label: "Timeline",
        items: [
            { id: "timeline-ai", title: "Timeline AI", phase: 2, icon: (0, jsx_runtime_1.jsx)(clapperboard_mjs_1.default, { size: 16 }), description: "Timeline health, cleanup, and execution." },
            { id: "auto-edit", title: "Auto Edit", phase: 3, icon: (0, jsx_runtime_1.jsx)(scissors_mjs_1.default, { size: 16 }), description: "One-click reels, highlights, and teasers." },
            { id: "auto-reel", title: "Auto Reel", phase: 2, icon: (0, jsx_runtime_1.jsx)(timer_reset_mjs_1.default, { size: 16 }), description: "Project-to-plan setup workflow for flagship reel generation." },
            { id: "prompt-reel", title: "Prompt Reel", phase: 3, icon: (0, jsx_runtime_1.jsx)(sparkles_mjs_1.default, { size: 16 }), description: "Free-text reel generation from Premiere clips." },
            { id: "voice-chat", title: "Voice / Chat", phase: 3, icon: (0, jsx_runtime_1.jsx)(mic_vocal_mjs_1.default, { size: 16 }), description: "Natural-language edit commands." }
        ]
    },
    {
        label: "Wedding",
        items: [
            { id: "wedding-ai", title: "Wedding AI", phase: 2, icon: (0, jsx_runtime_1.jsx)(sparkles_mjs_1.default, { size: 16 }), description: "Indian wedding event detection." },
            { id: "learn-style", title: "Learn My Style", phase: 3, icon: (0, jsx_runtime_1.jsx)(heart_handshake_mjs_1.default, { size: 16 }), description: "Capture Rohit's edit patterns." },
            { id: "director-learn", title: "Templates", phase: 1, icon: (0, jsx_runtime_1.jsx)(badge_indian_rupee_mjs_1.default, { size: 16 }), description: "Preset-driven wedding storytelling." }
        ]
    },
    {
        label: "Vision",
        items: [
            { id: "face-ai", title: "Face AI", phase: 2, icon: (0, jsx_runtime_1.jsx)(scan_face_mjs_1.default, { size: 16 }), description: "Bride, groom, family, guest search." },
            { id: "emotion-ai", title: "Emotion AI", phase: 2, icon: (0, jsx_runtime_1.jsx)(heart_handshake_mjs_1.default, { size: 16 }), description: "Emotion and reaction scoring." },
            { id: "camera-ai", title: "Camera AI", phase: 2, icon: (0, jsx_runtime_1.jsx)(camera_mjs_1.default, { size: 16 }), description: "Shot type and motion classification." },
            { id: "clip-intelligence", title: "Clip Intelligence", phase: 2, icon: (0, jsx_runtime_1.jsx)(aperture_mjs_1.default, { size: 16 }), description: "Blur, exposure, and AI rating." }
        ]
    },
    {
        label: "Music / Audio",
        items: [
            { id: "music-ai", title: "Music AI", phase: 2, icon: (0, jsx_runtime_1.jsx)(music_4_mjs_1.default, { size: 16 }), description: "Beat, BPM, mood, and chorus detection." },
            { id: "audio-ai", title: "Audio AI", phase: 3, icon: (0, jsx_runtime_1.jsx)(audio_lines_mjs_1.default, { size: 16 }), description: "Denoise, ducking, voice cleanup." },
            { id: "caption-ai", title: "Caption AI", phase: 3, icon: (0, jsx_runtime_1.jsx)(captions_mjs_1.default, { size: 16 }), description: "Hindi, English, and Hinglish captions." }
        ]
    },
    {
        label: "Color / Motion",
        items: [
            { id: "color-ai", title: "Color AI", phase: 3, icon: (0, jsx_runtime_1.jsx)(palette_mjs_1.default, { size: 16 }), description: "Film look, skin protection, match." },
            { id: "motion-ai", title: "Motion AI", phase: 3, icon: (0, jsx_runtime_1.jsx)(waves_horizontal_mjs_1.default, { size: 16 }), description: "Pan, zoom, parallax, blur helpers." }
        ]
    },
    {
        label: "Assets / Export",
        items: [
            { id: "asset-ai", title: "Asset AI", phase: 4, icon: (0, jsx_runtime_1.jsx)(folder_kanban_mjs_1.default, { size: 16 }), description: "Smart media search and collections." },
            { id: "export-ai", title: "Export AI", phase: 4, icon: (0, jsx_runtime_1.jsx)(download_mjs_1.default, { size: 16 }), description: "Preset exports and queue." }
        ]
    },
    {
        label: "Team / Ops",
        items: [
            { id: "team-workspace", title: "Team Workspace", phase: 4, icon: (0, jsx_runtime_1.jsx)(users_mjs_1.default, { size: 16 }), description: "Comments, approvals, versioning." },
            { id: "analytics", title: "Analytics", phase: 4, icon: (0, jsx_runtime_1.jsx)(activity_mjs_1.default, { size: 16 }), description: "AI usage and performance telemetry." },
            { id: "developer-center", title: "Developer Center", phase: 4, icon: (0, jsx_runtime_1.jsx)(monitor_cog_mjs_1.default, { size: 16 }), description: "Logs, prompts, and diagnostics." },
            { id: "settings", title: "Settings", phase: 1, icon: (0, jsx_runtime_1.jsx)(settings_mjs_1.default, { size: 16 }), description: "Gemini key and provider setup." }
        ]
    }
];
const QUICK_ACTIONS = [
    "Summarize current sequence",
    "Plan a 45-second wedding reel",
    "Check timeline health",
    "Suggest next module"
];
const RECENT_PROJECTS = [
    "Baby Shower Highlights",
    "Sangeet Master Sequence",
    "Vidaai Short Reel"
];
const memory = new brain_1.MemoryEngine();
const NAV_ITEM_COUNT = MODULE_GROUPS.reduce((count, group) => count + group.items.length, 0);
const IS_DEV = (/* unused pure expression or super */ null && ("production" !== "production"));
function AppShell() {
    const [activeModule, setActiveModule] = (0, react_1.useState)("dashboard");
    const [timelineInfo, setTimelineInfo] = (0, react_1.useState)(null);
    const [shellWidth, setShellWidth] = (0, react_1.useState)(() => readPanelWidth());
    const [navCollapsed, setNavCollapsed] = (0, react_1.useState)(false);
    const [assistantOpen, setAssistantOpen] = (0, react_1.useState)(true);
    const [assistantLog, setAssistantLog] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        console.log("[RK Flow] Active module:", activeModule);
    }, [activeModule]);
    (0, react_1.useEffect)(() => {
        const syncLayout = () => {
            const width = readPanelWidth();
            setShellWidth((current) => (current === width ? current : width));
            setNavCollapsed((current) => {
                const next = width < 900;
                return current === next ? current : next;
            });
            setAssistantOpen((current) => {
                const next = width >= 960;
                return current === next ? current : next;
            });
        };
        syncLayout();
        window.addEventListener("resize", syncLayout);
        return () => window.removeEventListener("resize", syncLayout);
    }, []);
    (0, react_1.useEffect)(() => {
        void premiereService_1.premiereService.getTimelineInfo().then(setTimelineInfo);
    }, []);
    const activeConfig = (0, react_1.useMemo)(() => {
        for (const group of MODULE_GROUPS) {
            const found = group.items.find((item) => item.id === activeModule);
            if (found) {
                return found;
            }
        }
        return MODULE_GROUPS[0].items[0];
    }, [activeModule]);
    const systemStats = (0, systemStats_1.getSystemStats)();
    const shellPadding = shellWidth > 0 && shellWidth < 480 ? theme_1.spacing.sm : theme_1.spacing.lg;
    const assistantActions = (0, react_1.useMemo)(() => {
        const perModule = {
            dashboard: QUICK_ACTIONS,
            "wedding-ai": ["Detect Haldi and Sangeet segments", "Label Bride Entry", "Show event timeline"],
            "face-ai": ["Find all Bride clips", "List family appearances", "Rename person cluster"],
            "emotion-ai": ["Filter smile clips", "Show reaction moments", "Find dance shots"],
            "camera-ai": ["Filter drone shots", "Show handheld clips", "List static shots"],
            "clip-intelligence": ["Sort by AI rating", "Show duplicate clips", "Explain low scores"],
            "music-ai": ["Show me the chorus sections", "Estimate BPM", "Overlay beat markers"],
            "timeline-ai": ["Score timeline health", "Find gaps", "Suggest cleanup report"],
            "auto-reel": ["Prepare a 60-second wedding highlight", "Scan selected clips", "Attach a reference reel URL"],
            settings: ["Test Gemini connection", "Explain model setup", "Show active provider"]
        };
        return perModule[activeModule] ?? [
            `Explain ${activeConfig.title}`,
            `What lands in Phase ${activeConfig.phase}?`,
            "Suggest the next best action"
        ];
    }, [activeConfig.phase, activeConfig.title, activeModule]);
    const handleToggleNav = (0, react_1.useCallback)(() => {
        setNavCollapsed((value) => !value);
    }, []);
    const handleSelectModule = (0, react_1.useCallback)((moduleId) => {
        if (false) // removed by dead control flow
{}
        setActiveModule((current) => (current === moduleId ? current : moduleId));
    }, []);
    const handleAssistantOpen = (0, react_1.useCallback)(() => {
        setAssistantOpen(true);
    }, []);
    const handleAssistantAction = (0, react_1.useCallback)((value) => {
        setAssistantLog((current) => [value, ...current].slice(0, 6));
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: `linear-gradient(180deg, ${theme_1.colors.ivory} 0%, ${theme_1.colors.panelMuted} 100%)`,
            color: theme_1.colors.ink,
            fontFamily: theme_1.typography.body
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: "1 1 auto", minHeight: 0, display: "flex", minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(LeftNav, { activeModule: activeModule, navCollapsed: navCollapsed, onSelectModule: handleSelectModule, onToggleNav: handleToggleNav }), (0, jsx_runtime_1.jsx)("main", { style: { flex: "1 1 auto", minWidth: 0, minHeight: 0, padding: shellPadding, boxSizing: "border-box" }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "stretch",
                                gap: theme_1.spacing.lg,
                                height: "100%",
                                minHeight: 0
                            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: appShellLayout_1.WORKSPACE_CONTENT_COLUMN_STYLE, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { style: { background: theme_1.colors.panel, boxShadow: theme_1.shadows.raised }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", gap: theme_1.spacing.md, flexWrap: "wrap", alignItems: "center" }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.gold, fontSize: theme_1.typography.sizes.xs, fontWeight: 700, textTransform: "uppercase" }, children: "Monday, August 3, 2026" }), (0, jsx_runtime_1.jsx)("h1", { style: { margin: `${theme_1.spacing.xs}px 0 0`, fontFamily: theme_1.typography.heading, fontSize: theme_1.typography.sizes.xxl, color: theme_1.colors.maroonDeep }, children: activeConfig.title }), (0, jsx_runtime_1.jsx)("p", { style: { margin: `${theme_1.spacing.xs}px 0 0`, color: theme_1.colors.inkMuted }, children: activeConfig.description })] }), !assistantOpen && ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: handleAssistantOpen, children: "Open Assistant" }))] }) }), (0, jsx_runtime_1.jsx)(primitives_1.ScrollArea, { style: appShellLayout_1.WORKSPACE_SCROLL_REGION_STYLE, children: (0, jsx_runtime_1.jsx)(ErrorBoundary_1.default, { resetKey: activeModule, children: (0, jsx_runtime_1.jsx)(WorkspacePanel, { moduleId: activeModule, timelineInfo: timelineInfo }) }) })] }), assistantOpen && ((0, jsx_runtime_1.jsx)("div", { style: { flex: "0 0 340px", width: 340, minWidth: 300, minHeight: 0 }, children: (0, jsx_runtime_1.jsx)(AIChatPanel_1.default, { title: "AI Assistant", suggestedActions: assistantActions, onAction: handleAssistantAction }) }))] }) })] }), (0, jsx_runtime_1.jsxs)("footer", { style: {
                    flex: "0 0 auto",
                    borderTop: `1px solid ${theme_1.colors.border}`,
                    background: theme_1.colors.panel,
                    padding: `${theme_1.spacing.xs}px ${shellPadding}px`,
                    display: "flex",
                    gap: theme_1.spacing.md,
                    flexWrap: "wrap",
                    alignItems: "center",
                    boxSizing: "border-box"
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "AI Ready", tone: "success" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `GPU ${systemStats.gpu}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `RAM ${systemStats.ram}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Timeline ${timelineInfo?.duration ?? "--"}` }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: timelineInfo?.sequenceName || "No active sequence" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Render Queue ${assistantLog.length}`, tone: "warning" }), (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Panel ${shellWidth}px` })] }), (0, jsx_runtime_1.jsx)(ExecutionPreviewModal_1.default, {})] }));
}
function readPanelWidth() {
    if (typeof window !== "undefined" && typeof window.innerWidth === "number" && Number.isFinite(window.innerWidth) && window.innerWidth > 0) {
        return Math.round(window.innerWidth);
    }
    if (typeof document !== "undefined") {
        const rootWidth = document.documentElement?.clientWidth;
        if (typeof rootWidth === "number" && Number.isFinite(rootWidth) && rootWidth > 0) {
            return rootWidth;
        }
        const bodyWidth = document.body?.clientWidth;
        if (typeof bodyWidth === "number" && Number.isFinite(bodyWidth) && bodyWidth > 0) {
            return bodyWidth;
        }
    }
    return 0;
}
const LeftNav = (0, react_1.memo)(function LeftNav({ activeModule, navCollapsed, onSelectModule, onToggleNav }) {
    (0, react_1.useEffect)(() => {
        if (false) // removed by dead control flow
{}
    }, []);
    return ((0, jsx_runtime_1.jsxs)("aside", { style: {
            width: navCollapsed ? 76 : 284,
            flex: "0 0 auto",
            borderRight: `1px solid ${theme_1.colors.border}`,
            background: theme_1.colors.panel,
            padding: theme_1.spacing.md,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: theme_1.spacing.md
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: theme_1.spacing.sm,
                    paddingBottom: theme_1.spacing.sm,
                    borderBottom: `1px solid ${theme_1.colors.border}`
                }, children: [!navCollapsed && ((0, jsx_runtime_1.jsxs)("div", { style: { minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontFamily: theme_1.typography.heading, fontSize: theme_1.typography.sizes.xl, color: theme_1.colors.maroonDeep }, children: "RK Flow" }), (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.xs, marginTop: 2 }, children: "AI Studio" })] })), (0, jsx_runtime_1.jsx)(primitives_1.IconButton, { onClick: onToggleNav, "aria-label": "Toggle navigation", children: (0, jsx_runtime_1.jsx)(timer_reset_mjs_1.default, { size: 16 }) })] }), (0, jsx_runtime_1.jsx)(primitives_1.ScrollArea, { style: { flex: "1 1 auto" }, children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.md, paddingTop: theme_1.spacing.xs }, children: MODULE_GROUPS.map((group) => ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.xs }, children: [!navCollapsed && ((0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.gold, fontSize: theme_1.typography.sizes.xs, fontWeight: 700, textTransform: "uppercase" }, children: group.label })), group.items.map((item) => {
                                const active = item.id === activeModule;
                                const navLabel = (0, appShellLayout_1.formatModuleNavLabel)(item.title, item.phase);
                                return ((0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: active ? "secondary" : "ghost", onClick: () => onSelectModule(item.id), title: navLabel, "aria-label": navLabel, style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: theme_1.spacing.sm,
                                        width: "100%",
                                        minHeight: 44,
                                        padding: navCollapsed ? theme_1.spacing.xs : theme_1.spacing.sm,
                                        justifyContent: navCollapsed ? "center" : "flex-start",
                                        borderRadius: 10,
                                        border: `1px solid ${active ? theme_1.colors.gold : theme_1.colors.border}`,
                                        background: active ? theme_1.colors.panelMuted : theme_1.colors.white,
                                        color: active ? theme_1.colors.maroonDeep : theme_1.colors.ink,
                                        boxSizing: "border-box",
                                        boxShadow: active ? theme_1.shadows.soft : "none"
                                    }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                                width: 28,
                                                height: 28,
                                                borderRadius: 8,
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: active ? theme_1.colors.cream : theme_1.colors.white,
                                                color: active ? theme_1.colors.maroon : theme_1.colors.inkMuted,
                                                border: `1px solid ${active ? theme_1.colors.goldSoft : theme_1.colors.border}`
                                            }, children: item.icon }), !navCollapsed && ((0, jsx_runtime_1.jsxs)("span", { style: appShellLayout_1.NAV_LABEL_STACK_STYLE, children: [(0, jsx_runtime_1.jsx)("span", { style: appShellLayout_1.NAV_TITLE_STYLE, children: item.title }), (0, jsx_runtime_1.jsx)("span", { style: appShellLayout_1.NAV_BADGE_ROW_STYLE, children: (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Phase ${item.phase}`, tone: active ? "warning" : "neutral" }) })] }))] }, item.id));
                            })] }, group.label))) }) })] }));
});
function WorkspacePanel({ moduleId, timelineInfo }) {
    if (moduleId === "dashboard") {
        return (0, jsx_runtime_1.jsx)(DashboardPanel, { timelineInfo: timelineInfo });
    }
    if (moduleId === "settings") {
        return (0, jsx_runtime_1.jsx)(SettingsPage_1.default, {});
    }
    if (moduleId === "wedding-ai") {
        return (0, jsx_runtime_1.jsx)(wedding_ai_1.default, {});
    }
    if (moduleId === "face-ai") {
        return (0, jsx_runtime_1.jsx)(face_ai_1.default, {});
    }
    if (moduleId === "emotion-ai") {
        return (0, jsx_runtime_1.jsx)(emotion_ai_1.default, {});
    }
    if (moduleId === "camera-ai") {
        return (0, jsx_runtime_1.jsx)(camera_ai_1.default, {});
    }
    if (moduleId === "clip-intelligence") {
        return (0, jsx_runtime_1.jsx)(clip_intelligence_1.default, {});
    }
    if (moduleId === "music-ai") {
        return (0, jsx_runtime_1.jsx)(music_ai_1.default, {});
    }
    if (moduleId === "timeline-ai") {
        return (0, jsx_runtime_1.jsx)(timeline_ai_1.default, {});
    }
    if (moduleId === "ai-director") {
        return (0, jsx_runtime_1.jsx)(ai_director_1.default, {});
    }
    if (moduleId === "reference-ai") {
        return (0, jsx_runtime_1.jsx)(reference_ai_1.default, {});
    }
    if (moduleId === "learn-style") {
        return (0, jsx_runtime_1.jsx)(LearnStyleComponent_1.default, {});
    }
    if (moduleId === "auto-edit") {
        return (0, jsx_runtime_1.jsx)(AutoEditComponent_1.default, {});
    }
    if (moduleId === "auto-reel") {
        return (0, jsx_runtime_1.jsx)(auto_reel_1.default, {});
    }
    if (moduleId === "prompt-reel") {
        return (0, jsx_runtime_1.jsx)(prompt_reel_1.default, {});
    }
    if (moduleId === "color-ai") {
        return (0, jsx_runtime_1.jsx)(ColorAIComponent_1.default, {});
    }
    if (moduleId === "motion-ai") {
        return (0, jsx_runtime_1.jsx)(MotionAIComponent_1.default, {});
    }
    if (moduleId === "audio-ai") {
        return (0, jsx_runtime_1.jsx)(AudioAIComponent_1.default, {});
    }
    if (moduleId === "caption-ai") {
        return (0, jsx_runtime_1.jsx)(CaptionAIComponent_1.default, {});
    }
    if (moduleId === "asset-ai") {
        return (0, jsx_runtime_1.jsx)(asset_ai_1.default, {});
    }
    if (moduleId === "export-ai") {
        return (0, jsx_runtime_1.jsx)(export_ai_1.default, {});
    }
    if (moduleId === "team-workspace") {
        return (0, jsx_runtime_1.jsx)(team_workspace_1.default, {});
    }
    if (moduleId === "analytics") {
        return (0, jsx_runtime_1.jsx)(analytics_1.default, {});
    }
    if (moduleId === "developer-center") {
        return (0, jsx_runtime_1.jsx)(developer_center_1.default, {});
    }
    const module = MODULE_GROUPS.flatMap((group) => group.items).find((item) => item.id === moduleId);
    if (!module) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: module.title, subtitle: `Coming in Phase ${module.phase}`, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, lineHeight: 1.7 }, children: module.description }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `Phase ${module.phase} placeholder` }) })] }));
}
function DashboardPanel({ timelineInfo }) {
    const scopeKey = timelineInfo?.sequenceName ? `face-ai:No Project::${timelineInfo.sequenceName}` : "";
    const faceResult = scopeKey ? memory.getAnalysis(scopeKey, "result") : null;
    const musicKeys = Object.keys(memory.load().analysis).filter((key) => key.startsWith("music-ai:file:"));
    const health = timelineInfo?.connected ? 82 : 18;
    const brideFound = (faceResult?.clusters ?? []).some((cluster) => cluster.role === "bride");
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: theme_1.spacing.md
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "AI Ready", subtitle: "Gemini assistant", style: { flex: "1 1 180px" }, children: (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: "Connected", tone: "success" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Bride Found", subtitle: "Face AI cluster result", style: { flex: "1 1 180px" }, children: (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: brideFound ? "Detected" : "Not detected yet", tone: brideFound ? "success" : "warning" }) }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Music Ready", subtitle: "Beat engine", style: { flex: "1 1 180px" }, children: (0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: musicKeys.length > 0 ? "Analyzed" : "Awaiting analysis", tone: musicKeys.length > 0 ? "success" : "warning" }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: theme_1.spacing.md
                }, children: [(0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "Timeline Health", subtitle: "Read directly from the active Premiere sequence.", style: { flex: "1 1 360px" }, children: [(0, jsx_runtime_1.jsx)(primitives_1.ProgressBar, { value: health, label: timelineInfo?.sequenceName || "No active sequence" }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted, lineHeight: 1.6 }, children: timelineInfo?.connected
                                    ? `Sequence duration ${timelineInfo.duration}, with ${timelineInfo.videoTracks} video tracks and ${timelineInfo.audioTracks} audio tracks.`
                                    : "Premiere sequence not connected yet." })] }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Quick Actions", subtitle: "Phase 1 launch shortcuts.", style: { flex: "1 1 280px" }, children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: QUICK_ACTIONS.map((action) => ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", style: { justifyContent: "flex-start", textAlign: "left" }, children: action }, action))) }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: theme_1.spacing.md
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Wedding Summary", subtitle: "RK Brain foundation overview.", style: { flex: "1 1 360px" }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm, color: theme_1.colors.inkMuted }, children: [(0, jsx_runtime_1.jsx)("div", { children: "Event style: Indian wedding storytelling." }), (0, jsx_runtime_1.jsx)("div", { children: "Preferred pacing: emotional build to celebration finish." }), (0, jsx_runtime_1.jsx)("div", { children: "Context engine status: ready for Phase 2 perception modules." })] }) }), (0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "Recent Projects", subtitle: "Local workspace list.", style: { flex: "1 1 280px" }, children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: RECENT_PROJECTS.map((project) => ((0, jsx_runtime_1.jsx)("div", { style: {
                                    padding: theme_1.spacing.sm,
                                    borderRadius: 10,
                                    border: `1px solid ${theme_1.colors.border}`,
                                    background: theme_1.colors.white
                                }, children: project }, project))) }) })] })] }));
}


/***/ },

/***/ 1746
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.NAV_BADGE_ROW_STYLE = exports.NAV_TITLE_STYLE = exports.NAV_LABEL_STACK_STYLE = exports.WORKSPACE_SCROLL_REGION_STYLE = exports.WORKSPACE_CONTENT_COLUMN_STYLE = void 0;
exports.formatModuleNavLabel = formatModuleNavLabel;
const theme_1 = __webpack_require__(3877);
exports.WORKSPACE_CONTENT_COLUMN_STYLE = {
    flex: "1 1 auto",
    minWidth: 0,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    gap: theme_1.spacing.lg,
    overflow: "hidden"
};
exports.WORKSPACE_SCROLL_REGION_STYLE = {
    flex: "1 1 auto",
    minWidth: 0,
    minHeight: 0
};
exports.NAV_LABEL_STACK_STYLE = {
    textAlign: "left",
    minWidth: 0,
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme_1.spacing.xs,
    overflow: "hidden"
};
exports.NAV_TITLE_STYLE = {
    display: "block",
    width: "100%",
    fontWeight: 700,
    lineHeight: 1.3
};
exports.NAV_BADGE_ROW_STYLE = {
    display: "flex",
    alignItems: "center",
    minWidth: 0
};
function formatModuleNavLabel(title, phase) {
    return `${title} Phase ${phase}`;
}


/***/ },

/***/ 7878
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ClipController = void 0;
class ClipController {
    bridge;
    constructor(bridge) {
        this.bridge = bridge;
    }
    async cut(clipId, time) {
        return this.bridge.execute("CUT_CLIP", { clipId, time });
    }
    async trim(clipId, start, end) {
        return this.bridge.execute("TRIM_CLIP", { clipId, start, end });
    }
    async move(clipId, targetTrackIndex, start) {
        return this.bridge.execute("MOVE_CLIP", {
            clipId,
            targetTrackIndex,
            start
        });
    }
}
exports.ClipController = ClipController;


/***/ },

/***/ 2622
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.ExportController = void 0;
class ExportController {
    bridge;
    constructor(bridge) {
        this.bridge = bridge;
    }
    async exportSequence(destinationPath, sequenceId, preset) {
        return this.bridge.execute("EXPORT_SEQUENCE", {
            destinationPath,
            sequenceId,
            preset
        });
    }
}
exports.ExportController = ExportController;


/***/ },

/***/ 4778
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.MarkerController = void 0;
class MarkerController {
    bridge;
    constructor(bridge) {
        this.bridge = bridge;
    }
    async create(name, time, color) {
        return this.bridge.execute("CREATE_MARKER", { name, time, color });
    }
    async delete(markerId) {
        return this.bridge.execute("DELETE_MARKER", { markerId });
    }
}
exports.MarkerController = MarkerController;


/***/ },

/***/ 1862
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PremiereBridge = void 0;
const TransactionManager_1 = __importDefault(__webpack_require__(1375));
class PremiereBridge {
    host;
    transactionManager;
    constructor(host) {
        this.host = host === undefined ? this.resolveHost() : host;
        const ppro = this.host?.app;
        this.transactionManager = ppro ? new TransactionManager_1.default(ppro) : null;
    }
    isConnected() {
        return this.host !== null;
    }
    async readTimeline() {
        if (this.host?.readTimeline !== undefined) {
            return this.host.readTimeline();
        }
        const sequence = await this.getActiveSequence();
        if (sequence === null) {
            return null;
        }
        const capabilityNotes = [];
        const [videoTrackCount, audioTrackCount, duration, inPoint, outPoint, playhead, settings, rawTimebase, frameSize, videoTracks, audioTracks] = await Promise.all([
            sequence.getVideoTrackCount(),
            sequence.getAudioTrackCount(),
            sequence.getEndTime(),
            sequence.getInPoint(),
            sequence.getOutPoint(),
            sequence.getPlayerPosition(),
            sequence.getSettings(),
            tryPremiereValue(() => sequence.getTimebase?.(), null),
            readFrameSize(sequence),
            this.readTracks(sequence, "video"),
            this.readTracks(sequence, "audio")
        ]);
        const timebase = typeof rawTimebase === "number" && Number.isFinite(rawTimebase) ? rawTimebase : null;
        if (timebase === null) {
            capabilityNotes.push({
                field: "timebase",
                source: "unavailable",
                reason: "Sequence.getTimebase() was not exposed by this Premiere host session."
            });
        }
        if (frameSize === null) {
            capabilityNotes.push({
                field: "frameSize",
                source: "unavailable",
                reason: "Sequence.getFrameSize() was not exposed by this Premiere host session."
            });
        }
        return {
            sequenceName: normalizeTextValue(sequence.name, ""),
            fps: await getFrameRate(settings),
            timebase,
            frameSize,
            duration: duration.seconds,
            playhead: playhead.seconds,
            inPoint: inPoint.seconds,
            outPoint: outPoint.seconds,
            videoTracks: videoTracks.length > 0 ? videoTracks : createTracks("video", videoTrackCount),
            audioTracks: audioTracks.length > 0 ? audioTracks : createTracks("audio", audioTrackCount),
            markers: [],
            capabilityNotes
        };
    }
    async execute(action, payload = {}) {
        const handler = ACTION_HANDLERS[action];
        if (handler) {
            try {
                const result = await handler(this, payload);
                if (!result.success) {
                    console.error(`[RK Flow][PremiereBridge] ${action} returned failure.`, { payload, result });
                }
                return result;
            }
            catch (error) {
                console.error(`[RK Flow][PremiereBridge] ${action} threw.`, { payload, error });
                return {
                    success: false,
                    message: `${action} failed.`,
                    error: error instanceof Error ? error.message : String(error)
                };
            }
        }
        if (this.host?.execute !== undefined) {
            return this.executeWithHost(action, payload);
        }
        return unsupported(action, "No local PremiereBridge handler exists and no writable host.execute bridge is attached.");
    }
    async createSequence(name) {
        return this.withProjectAction("CREATE_SEQUENCE", async (project) => {
            if (project.createSequence === undefined) {
                throw new Error("Project.createSequence() is not available in this Premiere runtime.");
            }
            const sequence = await project.createSequence(name);
            if (!sequence) {
                throw new Error("Premiere did not return the created sequence.");
            }
            if (project.setActiveSequence) {
                const activated = await project.setActiveSequence(sequence);
                if (!activated) {
                    throw new Error("Premiere created the sequence but could not make it active for assembly.");
                }
            }
            console.log("[RK Flow][CREATE_SEQUENCE] Created and activated sequence.", {
                requestedName: name,
                sequenceName: sequence.name
            });
            return sequence;
        });
    }
    async addTransition(type, start, duration) {
        return this.withTransaction("ADD_TRANSITION", async () => {
            const clip = await this.findVideoClipByTime(start);
            if (clip?.createAddVideoTransitionAction === undefined) {
                throw new Error("TrackItem.createAddVideoTransitionAction() is not available.");
            }
            return clip.createAddVideoTransitionAction(type, duration ?? 0.5);
        }, projectHint(projectAvailable(this.host)));
    }
    async applyPanAndZoom(clipId, preset) {
        const [x, y, scale] = panAndZoomPreset(preset);
        return this.setMotionProperties(clipId, { position: [x, y], scale });
    }
    async autoZoom(clipId, start, end) {
        const from = typeof start === "number" ? start : 0;
        const to = typeof end === "number" ? end : 1;
        const scale = 100 + Math.max(0, to - from) * 18;
        return this.setMotionProperties(clipId, { scale });
    }
    async applyParallax(clipId) {
        return this.setMotionProperties(clipId, { position: [0.54, 0.5], scale: 108 });
    }
    async applyMotionBlur(_clipId, _amount) {
        return unsupported("APPLY_MOTION_BLUR", "The discovered UXP API in this workspace does not expose a confirmed native motion-blur effect insertion or parameter transaction path.");
    }
    async reframe(_clipId) {
        return this.withProjectAction("REFRAME", async () => {
            const sequence = await this.getActiveSequence();
            if (sequence === null) {
                throw new Error("No active sequence is available.");
            }
            const autoReframe = sequence.autoReframeSequence;
            if (typeof autoReframe !== "function") {
                throw new Error("Sequence.autoReframeSequence() is not available in this Premiere runtime.");
            }
            return autoReframe.call(sequence, 9, 16, false, `${sequence.name} Auto Reframe`, true);
        });
    }
    async rippleDelete(_start, _end) {
        return unsupported("RIPPLE_DELETE", "SequenceEditor.createRemoveItemsAction() exists, but the required writable selection/remove parameter contract was not confirmed in this workspace.");
    }
    async importMedia(mediaPath) {
        return this.withProjectAction("IMPORT_MEDIA", async (project) => {
            if (project.importFiles === undefined) {
                throw new Error("Project.importFiles() is not available in this Premiere runtime.");
            }
            return project.importFiles([mediaPath]);
        });
    }
    async addClipToSequence(_payload) {
        return this.insertProjectItemToSequence("ADD_CLIP_TO_SEQUENCE", _payload, "video");
    }
    async addAudioToSequence(_payload) {
        return this.insertProjectItemToSequence("ADD_AUDIO_TO_SEQUENCE", _payload, "audio");
    }
    async autoTrim(_clipId) {
        return unsupported("AUTO_TRIM", "The local Premiere UXP API surface here does not expose a confirmed auto-trim analysis/action API.");
    }
    async beatCut(_clipId) {
        return unsupported("BEAT_CUT", "Beat detection and cut-placement APIs are not exposed by the discovered Premiere scripting surface in this workspace.");
    }
    async silenceRemove(_clipId) {
        return unsupported("SILENCE_REMOVE", "No confirmed Premiere UXP silence-analysis or automatic silence-removal transaction API is available here.");
    }
    async speedRamp(_clipId, _from, _to) {
        return unsupported("SPEED_RAMP", "The discovered local UXP API here exposes TrackItem.getSpeed() but no confirmed writable speed-ramp transaction method.");
    }
    async applyColorMatch(_sourceClipId, _targetClipId) {
        return unsupported("APPLY_COLOR_MATCH", "No confirmed Lumetri color-match transaction or documented effect-parameter mapping exists in this workspace.");
    }
    async applySkinToneProtection(_clipId) {
        return unsupported("APPLY_SKIN_TONE_PROTECTION", "Skin-tone protection would require a confirmed Lumetri/effect parameter map that is not present in this workspace.");
    }
    async applyFilmLut(_clipId, _lut) {
        return unsupported("APPLY_FILM_LUT", "The local reference shows ClipProjectItem.createSetInputLUTIDAction(), but there is no confirmed LUT-ID discovery path wired in this workspace.");
    }
    async autoGrade(_clipId) {
        return unsupported("AUTO_GRADE", "Auto-grade would require a grading algorithm plus confirmed writable Lumetri parameter bindings, neither of which is present here.");
    }
    async removeNoise(_clipId) {
        return unsupported("REMOVE_NOISE", "No confirmed native audio-effect insertion/parameter transaction path is exposed in the discovered UXP API here.");
    }
    async enhanceVoice(_clipId) {
        return unsupported("ENHANCE_VOICE", "No confirmed Speech/Essential Sound transaction API is exposed in this workspace.");
    }
    async autoDuck(_mainClipId, _musicClipId) {
        return unsupported("AUTO_DUCK", "No confirmed Essential Sound auto-duck transaction API is exposed in the discovered local Premiere surface.");
    }
    async cleanupSpeech(_clipId) {
        return unsupported("CLEANUP_SPEECH", "No confirmed speech cleanup/audio restoration transaction API is exposed in this workspace.");
    }
    async insertCaptions(_captions) {
        return unsupported("INSERT_CAPTIONS", "No confirmed caption-track creation or caption-item insertion API is exposed in the discovered local UXP surface here.");
    }
    async executeWithHost(action, payload) {
        try {
            const data = await this.host?.execute?.(action, payload);
            return {
                success: true,
                message: `${action} executed by host bridge.`,
                data
            };
        }
        catch (error) {
            return {
                success: false,
                message: `${action} failed.`,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async withProjectAction(action, callback) {
        const project = await this.getActiveProject();
        if (project === null) {
            return unsupported(action, "No active Premiere project is available.");
        }
        try {
            const data = await callback(project);
            return { success: true, message: `${action} executed.`, data };
        }
        catch (error) {
            return {
                success: false,
                message: `${action} failed.`,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async withTransaction(action, actionBuilder, unsupportedReason) {
        if (this.transactionManager === null) {
            return unsupported(action, unsupportedReason);
        }
        try {
            const executed = await this.transactionManager.executeAction(actionBuilder);
            return {
                success: executed,
                message: executed ? `${action} executed.` : `${action} did not complete.`
            };
        }
        catch (error) {
            return {
                success: false,
                message: `${action} failed.`,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }
    async setMotionProperties(clipId, { position, scale }) {
        return this.withProjectAction("APPLY_PAN_AND_ZOOM", async (project) => {
            if (project.lockedAccess === undefined || project.executeTransaction === undefined) {
                throw new Error("Project transaction APIs are not available.");
            }
            return project.lockedAccess(async () => {
                const clip = await this.findClipById(clipId);
                if (clip === null) {
                    throw new Error(`Clip "${clipId}" was not found on the active timeline.`);
                }
                const chain = await clip.getComponentChain?.();
                if (!chain) {
                    throw new Error("Clip component chain is not available.");
                }
                const motion = await chain.getComponentAtIndex?.(1);
                if (!motion) {
                    throw new Error("Motion component is not available.");
                }
                const actions = [];
                if (position) {
                    const positionParam = await motion.getParam?.(0);
                    if (positionParam?.createKeyframe === undefined || positionParam.createSetValueAction === undefined) {
                        throw new Error("Motion position parameter is not writable.");
                    }
                    const point = this.createPoint(position[0], position[1]);
                    const keyframe = positionParam.createKeyframe(point);
                    keyframe.value.value = [position[0], position[1]];
                    actions.push(positionParam.createSetValueAction(keyframe, true));
                }
                if (scale !== undefined) {
                    const scaleParam = await motion.getParam?.(1);
                    if (scaleParam?.createKeyframe === undefined || scaleParam.createSetValueAction === undefined) {
                        throw new Error("Motion scale parameter is not writable.");
                    }
                    const keyframe = scaleParam.createKeyframe(scale);
                    keyframe.value.value = scale;
                    actions.push(scaleParam.createSetValueAction(keyframe, true));
                }
                return project.executeTransaction?.((compoundAction) => {
                    for (const action of actions) {
                        compoundAction.addAction(action);
                    }
                });
            });
        });
    }
    async getActiveProject() {
        if (this.host?.app === undefined) {
            return null;
        }
        return this.host.app.Project.getActiveProject();
    }
    async getActiveSequence() {
        const project = await this.getActiveProject();
        return project === null ? null : project.getActiveSequence();
    }
    async readTracks(sequence, type) {
        const count = type === "video"
            ? await sequence.getVideoTrackCount()
            : await sequence.getAudioTrackCount();
        const tracks = [];
        for (let index = 0; index < count; index += 1) {
            const trackReader = type === "video" ? sequence.getVideoTrack?.bind(sequence) : sequence.getAudioTrack?.bind(sequence);
            if (!trackReader) {
                break;
            }
            const track = await trackReader(index);
            const clips = await this.readTrackClips(track, type);
            tracks.push({
                id: `${type}-${index + 1}`,
                name: `${type === "video" ? "Video" : "Audio"} ${index + 1}`,
                type,
                locked: null,
                capabilityNotes: [
                    {
                        field: "locked",
                        source: "unavailable",
                        reason: "The active Premiere runtime does not expose a verified track locked-state reader in this workspace."
                    }
                ],
                clips
            });
        }
        return tracks;
    }
    async readTrackClips(track, trackType) {
        if (track?.getTrackItems === undefined) {
            return [];
        }
        const clipType = this.host?.app?.Constants?.TrackItemType?.CLIP;
        const items = await track.getTrackItems(clipType, false);
        return Promise.all((items ?? []).map(async (clip, index) => {
            const projectItem = await tryPremiereValue(() => clip.getProjectItem?.(), null);
            const mediaPath = await this.readMediaPath(clip);
            const projectItemId = (await getProjectItemId(projectItem)) ?? null;
            const projectItemNodeId = getProjectItemNodeId(projectItem);
            const rawItemType = await tryPremiereValue(() => clip.getType?.(), null);
            const itemType = normalizeOptionalText(rawItemType);
            const rawMediaType = normalizeOptionalText(await tryPremiereValue(() => clip.getMediaType?.(), null));
            const sourceIn = readTickSeconds(await tryPremiereValue(() => clip.getInPoint?.(), null));
            const sourceOut = readTickSeconds(await tryPremiereValue(() => clip.getOutPoint?.(), null));
            const speed = await tryPremiereValue(() => clip.getSpeed?.(), null);
            const disabled = await tryPremiereValue(() => clip.isDisabled?.(), null);
            const sourceFrameSize = await readFrameSize(projectItem);
            const mediaTypeResolution = resolveClipMediaType(trackType, rawMediaType, itemType, mediaPath);
            const capabilityNotes = [...mediaTypeResolution.notes];
            if (projectItemId === null) {
                capabilityNotes.push({
                    field: "projectItemId",
                    source: "unavailable",
                    reason: "TrackItem.getProjectItem().getId() did not return a stable project-item identifier."
                });
            }
            if (mediaPath === null) {
                capabilityNotes.push({
                    field: "mediaPath",
                    source: "unavailable",
                    reason: "This track item did not expose a media file path through getMediaFilePath()."
                });
            }
            if (sourceIn === null || sourceOut === null) {
                capabilityNotes.push({
                    field: "sourceInOut",
                    source: "unavailable",
                    reason: "TrackItem.getInPoint()/getOutPoint() were not both available for this clip."
                });
            }
            if (speed === null) {
                capabilityNotes.push({
                    field: "speed",
                    source: "unavailable",
                    reason: "TrackItem.getSpeed() did not return a readable value in this host session."
                });
            }
            if (disabled === null) {
                capabilityNotes.push({
                    field: "disabled",
                    source: "unavailable",
                    reason: "TrackItem.isDisabled() did not return a readable value in this host session."
                });
            }
            if (sourceFrameSize === null) {
                capabilityNotes.push({
                    field: "sourceFrameSize",
                    source: "unavailable",
                    reason: "The source project item did not expose a frame size in this host session."
                });
            }
            capabilityNotes.push({
                field: "linkedClipIds",
                source: "unavailable",
                reason: "No verified linked audio/video relationship reader is exposed by the active Premiere runtime in this workspace."
            });
            capabilityNotes.push({
                field: "proxyState",
                source: "unavailable",
                reason: "No verified proxy-state reader is exposed by the active Premiere runtime in this workspace."
            });
            return {
                id: buildStableTimelineClipId({
                    name: await tryPremiereValue(() => clip.getName?.(), `clip-${index}`),
                    trackType,
                    trackIndex: await tryPremiereValue(() => clip.getTrackIndex?.(), 0),
                    start: (await tryPremiereValue(() => clip.getStartTime?.(), { seconds: 0 })).seconds ?? 0,
                    end: (await tryPremiereValue(() => clip.getEndTime?.(), { seconds: 0 })).seconds ?? 0,
                    sourceIn,
                    sourceOut,
                    projectItemId,
                    projectItemNodeId,
                    mediaPath
                }),
                name: await tryPremiereValue(() => clip.getName?.(), `Clip ${index + 1}`),
                start: (await tryPremiereValue(() => clip.getStartTime?.(), { seconds: 0 })).seconds ?? 0,
                end: (await tryPremiereValue(() => clip.getEndTime?.(), { seconds: 0 })).seconds ?? 0,
                duration: (await tryPremiereValue(() => clip.getDuration?.(), { seconds: 0 })).seconds ?? 0,
                trackIndex: await tryPremiereValue(() => clip.getTrackIndex?.(), 0),
                selected: await tryPremiereValue(() => clip.getIsSelected?.(), false),
                mediaPath,
                projectItemId,
                projectItemNodeId,
                mediaType: mediaTypeResolution.mediaType,
                itemType,
                sourceIn,
                sourceOut,
                speed,
                disabled,
                linkedClipIds: null,
                proxyState: null,
                sourceFrameSize,
                capabilityNotes
            };
        }));
    }
    async readMediaPath(clip) {
        const projectItem = await tryPremiereValue(() => clip.getProjectItem?.(), null);
        const media = await tryPremiereValue(() => projectItem?.getMedia?.(), null);
        if (media?.getMediaFilePath) {
            return media.getMediaFilePath();
        }
        if (projectItem?.getMediaFilePath) {
            return projectItem.getMediaFilePath();
        }
        return null;
    }
    async findClipById(clipId) {
        const sequence = await this.getActiveSequence();
        if (sequence === null) {
            return null;
        }
        for (const type of ["video", "audio"]) {
            const count = type === "video"
                ? await sequence.getVideoTrackCount()
                : await sequence.getAudioTrackCount();
            for (let trackIndex = 0; trackIndex < count; trackIndex += 1) {
                const track = type === "video"
                    ? await sequence.getVideoTrack?.(trackIndex)
                    : await sequence.getAudioTrack?.(trackIndex);
                const items = await track?.getTrackItems?.(this.host?.app?.Constants?.TrackItemType?.CLIP, false);
                for (const item of items ?? []) {
                    const name = await tryPremiereValue(() => item.getName?.(), "");
                    if (name === clipId) {
                        return item;
                    }
                }
            }
        }
        return null;
    }
    async findVideoClipByTime(time) {
        const sequence = await this.getActiveSequence();
        if (sequence === null || sequence.getVideoTrack === undefined) {
            return null;
        }
        const videoTrackCount = await sequence.getVideoTrackCount();
        const targetTime = typeof time === "number" ? time : null;
        for (let trackIndex = 0; trackIndex < videoTrackCount; trackIndex += 1) {
            const track = await sequence.getVideoTrack(trackIndex);
            const items = await track?.getTrackItems?.(this.host?.app?.Constants?.TrackItemType?.CLIP, false);
            for (const item of items ?? []) {
                if (targetTime === null) {
                    const selected = await tryPremiereValue(() => item.getIsSelected?.(), false);
                    if (selected) {
                        return item;
                    }
                    continue;
                }
                const start = (await tryPremiereValue(() => item.getStartTime?.(), { seconds: 0 })).seconds ?? 0;
                const end = (await tryPremiereValue(() => item.getEndTime?.(), { seconds: 0 })).seconds ?? 0;
                if (start <= targetTime && targetTime <= end) {
                    return item;
                }
            }
        }
        return null;
    }
    createPoint(x, y) {
        const PointCtor = this.host?.app?.PointF;
        if (PointCtor) {
            const point = new PointCtor();
            point.x = x;
            point.y = y;
            return point;
        }
        return { x, y };
    }
    createTickTime(seconds) {
        const TickTimeCtor = this.host?.app?.TickTime;
        if (TickTimeCtor && typeof TickTimeCtor.createWithSeconds === "function") {
            return TickTimeCtor.createWithSeconds(seconds);
        }
        throw new Error("TickTime.createWithSeconds() is not available in this Premiere runtime.");
    }
    async insertProjectItemToSequence(action, payload, mediaType) {
        return this.withProjectAction(action, async (project) => {
            const attempt = {
                action,
                mediaType,
                clipId: asString(payload.clipId),
                projectItemId: asString(payload.projectItemId),
                mediaPath: asString(payload.mediaPath),
                start: asNumber(payload.start) ?? 0
            };
            console.log(`[RK Flow][${action}] Starting insertion attempt.`, attempt);
            try {
                const sequence = await project.getActiveSequence();
                if (sequence === null) {
                    throw new Error("No active sequence is available.");
                }
                if (project.lockedAccess === undefined || project.executeTransaction === undefined) {
                    throw new Error("Project transaction APIs are not available for clip insertion in this Premiere runtime.");
                }
                const editor = await this.host?.app?.SequenceEditor?.getEditor?.(sequence);
                const createInsertProjectItemAction = editor?.createInsertProjectItemAction;
                if (typeof createInsertProjectItemAction !== "function") {
                    throw new Error("SequenceEditor.createInsertProjectItemAction() is not available in this Premiere runtime.");
                }
                const startSeconds = asNumber(payload.start) ?? 0;
                const videoTrackIndex = asNumber(payload.videoTrackIndex) ?? asNumber(payload.targetTrackIndex) ?? 0;
                const audioTrackIndex = asNumber(payload.audioTrackIndex) ?? asNumber(payload.targetTrackIndex) ?? 0;
                let projectItem = await this.findProjectItemForPayload(project, payload);
                if (projectItem === null && typeof payload.mediaPath === "string" && project.importFiles) {
                    await project.importFiles([payload.mediaPath]);
                    projectItem = await this.findProjectItemForPayload(project, payload);
                }
                if (projectItem === null) {
                    throw new Error("Project item could not be resolved for clip/audio insertion.");
                }
                const insertionTime = this.createTickTime(startSeconds);
                const beforeItemCount = await this.countSequenceItems(sequence, mediaType);
                console.log(`[RK Flow][${action}] Resolved project item and transaction inputs.`, {
                    ...attempt,
                    itemName: await getProjectItemName(projectItem),
                    resolvedProjectItemId: await getProjectItemId(projectItem),
                    beforeItemCount,
                    videoTrackIndex: mediaType === "video" ? videoTrackIndex : -1,
                    audioTrackIndex,
                    limitShift: true
                });
                const transactionCommitted = await project.lockedAccess(async () => project.executeTransaction?.((compoundAction) => {
                    const insertAction = createInsertProjectItemAction.call(editor, projectItem, insertionTime, mediaType === "video" ? videoTrackIndex : -1, audioTrackIndex, true);
                    if (!insertAction || compoundAction.addAction(insertAction) === false) {
                        throw new Error("Premiere rejected the insert-project-item action.");
                    }
                }));
                if (!transactionCommitted) {
                    throw new Error("Premiere did not commit the insert-project-item transaction.");
                }
                const afterItemCount = await this.countSequenceItems(sequence, mediaType);
                if (afterItemCount <= beforeItemCount) {
                    throw new Error(`Premiere committed the insert transaction but ${mediaType} item count did not increase (${beforeItemCount} -> ${afterItemCount}).`);
                }
                console.log(`[RK Flow][${action}] Insertion succeeded.`, {
                    ...attempt,
                    beforeItemCount,
                    afterItemCount,
                    transactionCommitted
                });
                return {
                    inserted: true,
                    mediaType,
                    startSeconds,
                    itemName: await getProjectItemName(projectItem),
                    videoTrackIndex: mediaType === "video" ? videoTrackIndex : -1,
                    audioTrackIndex
                };
            }
            catch (error) {
                console.error(`[RK Flow][${action}] Insertion failed.`, { ...attempt, error });
                throw error;
            }
        });
    }
    async countSequenceItems(sequence, mediaType) {
        const count = mediaType === "video"
            ? await sequence.getVideoTrackCount()
            : await sequence.getAudioTrackCount();
        const getTrack = mediaType === "video" ? sequence.getVideoTrack?.bind(sequence) : sequence.getAudioTrack?.bind(sequence);
        if (!getTrack) {
            return 0;
        }
        let itemCount = 0;
        for (let index = 0; index < count; index += 1) {
            const track = await getTrack(index);
            const items = await track?.getTrackItems?.(this.host?.app?.Constants?.TrackItemType?.CLIP, false);
            itemCount += Array.isArray(items) ? items.length : 0;
        }
        return itemCount;
    }
    async findProjectItemForPayload(project, payload) {
        const candidates = [
            asString(payload.projectItemId),
            asString(payload.clipId),
            asString(payload.assetId),
            asString(payload.mediaPath)
        ].filter((value) => Boolean(value));
        for (const candidate of candidates) {
            const timelineMatch = await this.findProjectItemInSequences(project, candidate);
            if (timelineMatch) {
                return timelineMatch;
            }
            const root = await project.getRootItem?.();
            if (!root) {
                continue;
            }
            const match = await this.findProjectItemRecursive(root, candidate);
            if (match) {
                return match;
            }
        }
        return null;
    }
    async findProjectItemInSequences(project, candidate) {
        const sequences = await project.getSequences?.();
        const clipType = this.host?.app?.Constants?.TrackItemType?.CLIP;
        for (const sequence of sequences ?? []) {
            const trackCount = await sequence.getVideoTrackCount();
            for (let trackIndex = 0; trackIndex < trackCount; trackIndex += 1) {
                const track = await sequence.getVideoTrack?.(trackIndex);
                const items = await tryPremiereValue(() => track?.getTrackItems?.(clipType, false), []);
                for (const clip of items ?? []) {
                    const projectItem = await tryPremiereValue(() => clip.getProjectItem?.(), null);
                    if (await projectItemMatches(projectItem, candidate)) {
                        console.log("[RK Flow][ADD_CLIP_TO_SEQUENCE] Resolved project item from source sequence.", {
                            candidate,
                            sourceSequence: sequence.name,
                            sourceTrackIndex: trackIndex
                        });
                        return projectItem;
                    }
                }
            }
        }
        return null;
    }
    async findProjectItemRecursive(rootItem, candidate) {
        // UXP FolderItem exposes child project items through getItems(), not CEP's children collection.
        const items = await rootItem?.getItems?.();
        for (const item of items ?? []) {
            if (await projectItemMatches(item, candidate)) {
                return item;
            }
            if (typeof item?.getItems === "function") {
                const nested = await this.findProjectItemRecursive(item, candidate);
                if (nested) {
                    return nested;
                }
            }
        }
        return null;
    }
    resolveHost() {
        const moduleRequire = globalThis.require;
        if (typeof moduleRequire !== "function") {
            return null;
        }
        try {
            const app = moduleRequire("premierepro");
            return app?.Project?.getActiveProject === undefined ? null : { app };
        }
        catch {
            return null;
        }
    }
}
exports.PremiereBridge = PremiereBridge;
function normalizeTextValue(value, fallback) {
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return fallback;
}
const ACTION_HANDLERS = {
    CREATE_SEQUENCE: (bridge, payload) => bridge.createSequence(String(payload.name ?? "")),
    IMPORT_MEDIA: (bridge, payload) => bridge.importMedia(String(payload.mediaPath ?? "")),
    ADD_TRANSITION: (bridge, payload) => bridge.addTransition(String(payload.type ?? "cross_dissolve"), asNumber(payload.start), asNumber(payload.duration)),
    AUTO_ZOOM: (bridge, payload) => bridge.autoZoom(String(payload.clipId ?? ""), payload.start, payload.end),
    APPLY_PAN_AND_ZOOM: (bridge, payload) => bridge.applyPanAndZoom(String(payload.clipId ?? ""), String(payload.preset ?? "")),
    APPLY_PARALLAX: (bridge, payload) => bridge.applyParallax(String(payload.clipId ?? "")),
    APPLY_MOTION_BLUR: (bridge, payload) => bridge.applyMotionBlur(String(payload.clipId ?? ""), String(payload.amount ?? "")),
    REFRAME: (bridge, payload) => bridge.reframe(String(payload.clipId ?? "")),
    RIPPLE_DELETE: (bridge, payload) => bridge.rippleDelete(asNumber(payload.start) ?? 0, asNumber(payload.end) ?? 0),
    ADD_CLIP_TO_SEQUENCE: (bridge, payload) => bridge.addClipToSequence(payload),
    ADD_AUDIO_TO_SEQUENCE: (bridge, payload) => bridge.addAudioToSequence(payload),
    AUTO_TRIM: (bridge, payload) => bridge.autoTrim(asString(payload.clipId)),
    BEAT_CUT: (bridge, payload) => bridge.beatCut(asString(payload.clipId)),
    SILENCE_REMOVE: (bridge, payload) => bridge.silenceRemove(asString(payload.clipId)),
    SPEED_RAMP: (bridge, payload) => bridge.speedRamp(String(payload.clipId ?? ""), asNumber(payload.from) ?? 0, asNumber(payload.to) ?? 0),
    APPLY_COLOR_MATCH: (bridge, payload) => bridge.applyColorMatch(String(payload.sourceClipId ?? ""), String(payload.targetClipId ?? "")),
    APPLY_SKIN_TONE_PROTECTION: (bridge, payload) => bridge.applySkinToneProtection(String(payload.clipId ?? "")),
    APPLY_FILM_LUT: (bridge, payload) => bridge.applyFilmLut(String(payload.clipId ?? ""), String(payload.lut ?? "")),
    AUTO_GRADE: (bridge, payload) => bridge.autoGrade(String(payload.clipId ?? "")),
    REMOVE_NOISE: (bridge, payload) => bridge.removeNoise(String(payload.clipId ?? "")),
    ENHANCE_VOICE: (bridge, payload) => bridge.enhanceVoice(String(payload.clipId ?? "")),
    AUTO_DUCK: (bridge, payload) => bridge.autoDuck(String(payload.mainClipId ?? ""), String(payload.musicClipId ?? "")),
    CLEANUP_SPEECH: (bridge, payload) => bridge.cleanupSpeech(String(payload.clipId ?? "")),
    INSERT_CAPTIONS: (bridge, payload) => bridge.insertCaptions(String(payload.captions ?? ""))
};
async function getFrameRate(settings) {
    if (settings.getVideoFrameRate === undefined) {
        return 0;
    }
    return (await settings.getVideoFrameRate()).value;
}
function createTracks(type, count) {
    return Array.from({ length: count }, (_, index) => ({
        id: `${type}-${index + 1}`,
        name: `${type === "video" ? "Video" : "Audio"} ${index + 1}`,
        type,
        locked: null,
        capabilityNotes: [
            {
                field: "locked",
                source: "unavailable",
                reason: "The active Premiere runtime does not expose a verified track locked-state reader in this workspace."
            }
        ],
        clips: []
    }));
}
function unsupported(action, reason) {
    return {
        success: false,
        message: `${action} is not supported by the local PremiereBridge implementation.`,
        error: reason
    };
}
function panAndZoomPreset(preset) {
    switch (preset) {
        case "slow_zoom_in":
            return [0.5, 0.5, 112];
        case "pan_left_to_right":
            return [0.68, 0.5, 105];
        default:
            return [0.5, 0.5, 105];
    }
}
function asNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function asString(value) {
    return typeof value === "string" && value.length > 0 ? value : undefined;
}
async function projectItemMatches(item, candidate) {
    if (!item) {
        return false;
    }
    if (String(item.nodeId ?? "") === candidate) {
        return true;
    }
    if ((await getProjectItemId(item)) === candidate) {
        return true;
    }
    if (String(item.name ?? "") === candidate) {
        return true;
    }
    const mediaPath = await getProjectItemMediaPath(item);
    return mediaPath === candidate;
}
async function getProjectItemId(item) {
    try {
        const id = await item?.getId?.();
        return typeof id === "string" && id.length > 0 ? id : undefined;
    }
    catch {
        return undefined;
    }
}
async function getProjectItemMediaPath(item) {
    if (typeof item.getMediaFilePath === "function") {
        return item.getMediaFilePath();
    }
    const media = await tryPremiereValue(() => item?.getMedia?.(), null);
    if (media?.getMediaFilePath) {
        return media.getMediaFilePath();
    }
    return undefined;
}
async function tryPremiereValue(callback, fallback) {
    try {
        const value = await callback();
        return value ?? fallback;
    }
    catch {
        return fallback;
    }
}
async function getProjectItemName(item) {
    if (typeof item.getName === "function") {
        return item.getName();
    }
    return String(item.name ?? "Unknown Item");
}
function projectAvailable(host) {
    return host?.app?.Project?.getActiveProject !== undefined;
}
function projectHint(available) {
    return available
        ? "Premiere transaction APIs are available, but this action requires a confirmed writable transaction contract."
        : "No active writable Premiere project/transaction runtime is attached.";
}
function normalizeOptionalText(value) {
    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return null;
}
function readTickSeconds(value) {
    if (typeof value === "object" && value !== null && typeof value.seconds === "number") {
        return value.seconds;
    }
    return null;
}
async function readFrameSize(source) {
    if (!source?.getFrameSize) {
        return null;
    }
    try {
        const value = await source.getFrameSize();
        const width = typeof value?.width === "number" && Number.isFinite(value.width) ? value.width : null;
        const height = typeof value?.height === "number" && Number.isFinite(value.height) ? value.height : null;
        return width !== null && height !== null ? { width, height } : null;
    }
    catch {
        return null;
    }
}
function resolveClipMediaType(trackType, rawMediaType, itemType, mediaPath) {
    const notes = [];
    const mediaTypeText = rawMediaType?.toLowerCase() ?? "";
    const itemTypeText = itemType?.toLowerCase() ?? "";
    if (trackType === "audio" || /audio/.test(mediaTypeText)) {
        return { mediaType: "audio", notes };
    }
    if (/(still|image|photo)/.test(itemTypeText)) {
        return { mediaType: "still", notes };
    }
    if (isStillMediaPath(mediaPath)) {
        notes.push({
            field: "mediaType",
            source: "metadata-fallback",
            reason: "Still-image detection used the media file extension because no verified host item-type flag was exposed."
        });
        return { mediaType: "still", notes };
    }
    if (trackType === "video" || /video/.test(mediaTypeText)) {
        return { mediaType: "video", notes };
    }
    notes.push({
        field: "mediaType",
        source: "unavailable",
        reason: "The active Premiere runtime did not expose a readable clip media type for this track item."
    });
    return { mediaType: "unknown", notes };
}
function isStillMediaPath(mediaPath) {
    return mediaPath !== null && /\.(jpg|jpeg|png|gif|bmp|tif|tiff|webp|heic)$/i.test(mediaPath);
}
function getProjectItemNodeId(item) {
    const nodeId = item?.nodeId;
    if (typeof nodeId === "string" && nodeId.length > 0) {
        return nodeId;
    }
    if (typeof nodeId === "number" && Number.isFinite(nodeId)) {
        return String(nodeId);
    }
    return null;
}
function buildStableTimelineClipId(input) {
    return [
        input.trackType,
        input.trackIndex,
        formatStableNumber(input.start),
        formatStableNumber(input.end),
        formatStableNumber(input.sourceIn),
        formatStableNumber(input.sourceOut),
        input.projectItemId ?? "project-item:unknown",
        input.projectItemNodeId ?? "node:unknown",
        input.mediaPath ?? "path:unknown",
        input.name
    ].join("::");
}
function formatStableNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value.toFixed(3) : "unknown";
}


/***/ },

/***/ 4857
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.SequenceController = void 0;
class SequenceController {
    bridge;
    constructor(bridge) {
        this.bridge = bridge;
    }
    async create(name, fps) {
        return this.bridge.execute("CREATE_SEQUENCE", { name, fps });
    }
    async importMedia(mediaPath, binPath) {
        return this.bridge.execute("IMPORT_MEDIA", { mediaPath, binPath });
    }
    async rippleDelete(start, end) {
        return this.bridge.execute("RIPPLE_DELETE", { start, end });
    }
}
exports.SequenceController = SequenceController;


/***/ },

/***/ 824
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.TimelineReader = void 0;
class TimelineReader {
    bridge;
    constructor(bridge) {
        this.bridge = bridge;
    }
    async read() {
        return this.bridge.readTimeline();
    }
    async getSelectedClips() {
        const timeline = await this.read();
        if (timeline === null) {
            return [];
        }
        return [...timeline.videoTracks, ...timeline.audioTracks].flatMap((track) => track.clips.filter((clip) => clip.selected));
    }
    async getInOut() {
        const timeline = await this.read();
        if (timeline === null) {
            return null;
        }
        return {
            inPoint: timeline.inPoint,
            outPoint: timeline.outPoint
        };
    }
    async getPlayhead() {
        const timeline = await this.read();
        return timeline?.playhead ?? null;
    }
}
exports.TimelineReader = TimelineReader;


/***/ },

/***/ 9585
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.EffectsController = void 0;
class EffectsController {
    bridge;
    constructor(bridge) {
        this.bridge = bridge;
    }
    autoTrim(clipId) {
        return this.bridge.execute("AUTO_TRIM", { clipId });
    }
    beatCut(clipId) {
        return this.bridge.execute("BEAT_CUT", { clipId });
    }
    silenceRemove(clipId) {
        return this.bridge.execute("SILENCE_REMOVE", { clipId });
    }
    speedRamp(clipId, from, to) {
        return this.bridge.execute("SPEED_RAMP", { clipId, from, to });
    }
    autoZoom(clipId, start, end) {
        return this.bridge.execute("AUTO_ZOOM", { clipId, start, end });
    }
    reframe(clipId) {
        return this.bridge.execute("REFRAME", { clipId });
    }
}
exports.EffectsController = EffectsController;


/***/ },

/***/ 868
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.premiereAPI = exports.PremiereAPI = void 0;
const MotionEngine_1 = __importDefault(__webpack_require__(2318));
class PremiereAPI {
    PPRO;
    motion;
    constructor() {
        this.PPRO = window.PPRO;
        this.motion = new MotionEngine_1.default(this.PPRO);
    }
    getPPRO() {
        return this.PPRO;
    }
    async getCurrentProject() {
        return await this.PPRO.Project.getActiveProject();
    }
    async getActiveSequence() {
        const project = await this.getCurrentProject();
        return project ? await project.getActiveSequence() : null;
    }
    async getTimelineContext() {
        const project = await this.getCurrentProject();
        if (!project)
            return null;
        const sequence = await this.getActiveSequence();
        if (!sequence)
            return null;
        return {
            projectName: project.name,
            sequenceName: sequence.name,
            videoTracks: await sequence.getVideoTrackCount(),
            audioTracks: await sequence.getAudioTrackCount(),
            frameSize: await sequence.getFrameSize(),
            timebase: await sequence.getTimebase(),
            selection: await sequence.getSelection()
        };
    }
    async getProjectInfo() {
        return await this.getTimelineContext();
    }
    async center() {
        return await this.motion.center();
    }
    async left() {
        return await this.motion.left();
    }
    async right() {
        return await this.motion.right();
    }
    async top() {
        return await this.motion.top();
    }
    async bottom() {
        return await this.motion.bottom();
    }
    async setPosition(x, y) {
        return await this.motion.setPosition(x, y);
    }
}
exports.PremiereAPI = PremiereAPI;
exports.premiereAPI = new PremiereAPI();


/***/ },

/***/ 2954
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.loggerService = __webpack_unused_export__ = void 0;
class LoggerService {
    entries = [];
    listeners = new Set();
    log(message, severity = 'info') {
        this.entries.push({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            severity,
            message,
            timestamp: new Date().toLocaleTimeString(),
        });
        console.info(`[RK Flow] ${severity.toUpperCase()}: ${message}`);
        this.emit();
    }
    getEntries() {
        return [...this.entries];
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.getEntries());
        return () => {
            this.listeners.delete(listener);
        };
    }
    clear() {
        this.entries.length = 0;
        this.emit();
    }
    emit() {
        const snapshot = this.getEntries();
        this.listeners.forEach((listener) => listener(snapshot));
    }
}
__webpack_unused_export__ = LoggerService;
exports.loggerService = new LoggerService();


/***/ },

/***/ 8442
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
exports.getFrameExtractor = getFrameExtractor;
class FrameExtractor {
    async extractFrame(sequenceId, timecode) {
        const runtime = this.resolveRuntime();
        if (!runtime.ppro || !runtime.fs || !runtime.path) {
            return {
                ok: false,
                source: "metadata-only",
                error: "Premiere frame exporter is unavailable in this panel runtime.",
                timecode
            };
        }
        const cacheDirectory = this.resolveCacheDirectory(runtime);
        if (!cacheDirectory) {
            return {
                ok: false,
                source: "metadata-only",
                error: "No writable frame cache directory is available in this host.",
                timecode
            };
        }
        const project = await runtime.ppro.Project.getActiveProject();
        const sequence = project ? await project.getActiveSequence() : null;
        if (!sequence) {
            return {
                ok: false,
                source: "metadata-only",
                error: "No active sequence.",
                timecode
            };
        }
        const activeSequenceId = String(sequence.guid ?? sequence.name ?? "active-sequence");
        const effectiveSequenceId = sequenceId || activeSequenceId;
        const cachePath = this.getFramePath(runtime, cacheDirectory, effectiveSequenceId, timecode);
        try {
            runtime.fs.mkdirSync(cacheDirectory, { recursive: true });
        }
        catch (error) {
            return {
                ok: false,
                source: "metadata-only",
                error: error instanceof Error ? error.message : String(error),
                timecode
            };
        }
        if (runtime.fs.existsSync(cachePath)) {
            return this.readFrame(runtime, cachePath, timecode);
        }
        try {
            const position = runtime.ppro.TickTime &&
                typeof runtime.ppro.TickTime.createWithSeconds === "function"
                ? runtime.ppro.TickTime.createWithSeconds(Number(timecode))
                : await sequence.getPlayerPosition();
            const size = await sequence.getFrameSize();
            const filename = runtime.path.basename(cachePath);
            const returned = await runtime.ppro.Exporter.exportSequenceFrame(sequence, position, filename, cacheDirectory, size.width, size.height);
            const finalPath = runtime.path.join(cacheDirectory, filename);
            if (!runtime.fs.existsSync(finalPath)) {
                return {
                    ok: false,
                    source: "metadata-only",
                    error: `Frame export returned ${JSON.stringify(returned)} but no file was written.`,
                    timecode
                };
            }
            return this.readFrame(runtime, finalPath, timecode);
        }
        catch (error) {
            return {
                ok: false,
                source: "metadata-only",
                error: error instanceof Error ? error.message : String(error),
                timecode
            };
        }
    }
    async extractClipSamples(sequenceId, clip) {
        const duration = Math.max(clip.duration, 0.25);
        const epsilon = Math.min(0.04, duration / 10);
        const sampleTimes = [
            clip.start,
            clip.start + duration * 0.25,
            clip.start + duration * 0.5,
            clip.start + duration * 0.75,
            Math.max(clip.start, clip.end - epsilon)
        ];
        const frames = [];
        for (const timecode of sampleTimes) {
            frames.push(await this.extractFrame(sequenceId, timecode));
        }
        const source = frames.some((frame) => frame.ok) ? "visual" : "metadata-only";
        return {
            clipId: clip.id,
            clipName: clip.name,
            frames,
            source
        };
    }
    resolveRuntime() {
        return {
            ppro: resolveModule("premierepro"),
            fs: resolveModule("fs"),
            path: resolveModule("path"),
            os: resolveModule("os"),
            processRef: typeof process !== "undefined"
                ? process
                : (typeof globalThis !== "undefined" ? globalThis.process : null)
        };
    }
    resolveCacheDirectory(runtime) {
        const { fs, path, os, processRef } = runtime;
        if (!fs || !path) {
            return null;
        }
        const candidates = [
            safeTempDirFromOs(os),
            safeEnv(processRef, "RKFLOW_FRAME_CACHE_DIR"),
            safeEnv(processRef, "TMPDIR"),
            safeEnv(processRef, "TMP"),
            safeEnv(processRef, "TEMP"),
            safeCwd(processRef)
        ].filter((value) => typeof value === "string" && value.length > 0);
        for (const candidate of candidates) {
            const folder = path.join(candidate, "rkflow-frame-cache");
            try {
                fs.mkdirSync(folder, { recursive: true });
                return folder;
            }
            catch { }
        }
        return null;
    }
    getFramePath(runtime, cacheDirectory, sequenceId, timecode) {
        const safeSequence = sequenceId.replace(/[^a-zA-Z0-9_-]/g, "_");
        const safeTime = timecode.toFixed(3).replace(/\./g, "_");
        return runtime.path.join(cacheDirectory, `${safeSequence}_${safeTime}.png`);
    }
    readFrame(runtime, filePath, timecode) {
        const base64 = runtime.fs.readFileSync(filePath).toString("base64");
        return {
            ok: true,
            path: filePath,
            mimeType: "image/png",
            base64,
            source: "visual",
            timecode
        };
    }
}
__webpack_unused_export__ = FrameExtractor;
let frameExtractorSingleton = null;
function getFrameExtractor() {
    if (frameExtractorSingleton === null) {
        frameExtractorSingleton = new FrameExtractor();
    }
    return frameExtractorSingleton;
}
function resolveModule(name) {
    const requireFn = (typeof globalThis !== "undefined" ? globalThis.require : undefined) ||
        (typeof window !== "undefined" ? window.require : undefined);
    if (typeof requireFn !== "function") {
        return null;
    }
    try {
        return requireFn(name);
    }
    catch {
        return null;
    }
}
function safeTempDirFromOs(osModule) {
    try {
        if (osModule && typeof osModule.tmpdir === "function") {
            return osModule.tmpdir();
        }
    }
    catch { }
    return "";
}
function safeEnv(processRef, key) {
    try {
        return String(processRef?.env?.[key] ?? "");
    }
    catch {
        return "";
    }
}
function safeCwd(processRef) {
    try {
        if (processRef && typeof processRef.cwd === "function") {
            return processRef.cwd();
        }
    }
    catch { }
    return "";
}


/***/ },

/***/ 2276
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.clipManager = __webpack_unused_export__ = void 0;
const PremiereAPI_1 = __webpack_require__(868);
class ClipManager {
    async getSelectedClips() {
        const sequence = await PremiereAPI_1.premiereAPI.getActiveSequence();
        if (!sequence)
            return [];
        const selection = await sequence.getSelection();
        const items = await selection.getItems();
        const result = [];
        for (const clip of items) {
            const start = await clip.getStartTime();
            const end = await clip.getEndTime();
            const duration = await clip.getDuration();
            result.push({
                name: await clip.getName(),
                start: start?.seconds ?? 0,
                end: end?.seconds ?? 0,
                duration: duration?.seconds ?? 0,
                track: await clip.getTrackIndex(),
                mediaType: await clip.getMediaType(),
                type: await clip.getType(),
                projectItem: await clip.getProjectItem(),
                raw: clip
            });
        }
        return result;
    }
    async getSelectedClipNames() {
        const clips = await this.getSelectedClips();
        return clips.map(c => c.name);
    }
    async hasSelection() {
        return (await this.getSelectedClips()).length > 0;
    }
}
__webpack_unused_export__ = ClipManager;
exports.clipManager = new ClipManager();


/***/ },

/***/ 3763
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.premiereService = __webpack_unused_export__ = void 0;
const PremiereBridge_1 = __webpack_require__(1862);
class PremiereService {
    bridge = new PremiereBridge_1.PremiereBridge();
    async getTimelineInfo() {
        if (!this.bridge.isConnected()) {
            return emptyTimelineInfo(false);
        }
        try {
            const timeline = await this.bridge.readTimeline();
            if (timeline === null) {
                return emptyTimelineInfo(true);
            }
            return {
                connected: true,
                projectName: "",
                sequenceName: normalizeLabelText(timeline.sequenceName, ""),
                videoTracks: timeline.videoTracks.length,
                audioTracks: timeline.audioTracks.length,
                frameSize: null,
                timebase: timeline.fps || null,
                duration: formatDuration(timeline.duration)
            };
        }
        catch (error) {
            console.error("[RK Flow] Could not read the active Premiere timeline.", error);
            return emptyTimelineInfo(false);
        }
    }
}
__webpack_unused_export__ = PremiereService;
function normalizeLabelText(value, fallback) {
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return fallback;
}
function emptyTimelineInfo(connected) {
    return {
        connected,
        projectName: "",
        sequenceName: "",
        videoTracks: 0,
        audioTracks: 0,
        frameSize: null,
        timebase: null,
        duration: "--"
    };
}
function formatDuration(totalSeconds) {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return [hours, minutes, remainingSeconds]
        .map((value) => String(value).padStart(2, "0"))
        .join(":");
}
exports.premiereService = new PremiereService();


/***/ },

/***/ 1125
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.getSystemStats = getSystemStats;
const SHARED_SYSTEM_STATS = {
    gpu: "—",
    ram: "—"
};
function getSystemStats() {
    return {
        gpu: normalizeSystemStat(SHARED_SYSTEM_STATS.gpu),
        ram: normalizeSystemStat(SHARED_SYSTEM_STATS.ram)
    };
}
function normalizeSystemStat(value) {
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return "—";
}


/***/ },

/***/ 111
(__unused_webpack_module, exports) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.COMMAND_ACTIONS = void 0;
exports.createCommand = createCommand;
exports.COMMAND_ACTIONS = [
    "READ_TIMELINE",
    "READ_SELECTED_CLIPS",
    "GET_IN_OUT",
    "GET_PLAYHEAD",
    "MOVE_PLAYHEAD",
    "CREATE_MARKER",
    "DELETE_MARKER",
    "CUT_CLIP",
    "TRIM_CLIP",
    "MOVE_CLIP",
    "CREATE_SEQUENCE",
    "IMPORT_MEDIA",
    "EXPORT_SEQUENCE",
    "CREATE_REEL",
    "RIPPLE_DELETE",
    "AUTO_TRIM",
    "BEAT_CUT",
    "SILENCE_REMOVE",
    "SPEED_RAMP",
    "AUTO_ZOOM",
    "REFRAME",
    "ADD_CLIP_TO_SEQUENCE",
    "ADD_AUDIO_TO_SEQUENCE",
    "ADD_TRANSITION",
    "APPLY_COLOR_MATCH",
    "APPLY_SKIN_TONE_PROTECTION",
    "APPLY_FILM_LUT",
    "AUTO_GRADE",
    "APPLY_PAN_AND_ZOOM",
    "APPLY_PARALLAX",
    "APPLY_MOTION_BLUR",
    "REMOVE_NOISE",
    "ENHANCE_VOICE",
    "AUTO_DUCK",
    "CLEANUP_SPEECH",
    "INSERT_CAPTIONS"
];
let commandCounter = 0;
function createCommand(action, payload = {}) {
    commandCounter += 1;
    return {
        id: `rk-command-${Date.now()}-${commandCounter}`,
        action,
        payload,
        timestamp: Date.now()
    };
}


/***/ },

/***/ 1820
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = ClipGrid;
const jsx_runtime_1 = __webpack_require__(4848);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
function ClipGrid({ items, emptyLabel }) {
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { title: "No clips", children: (0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            display: "flex",
            flexWrap: "wrap",
            gap: theme_1.spacing.md
        }, children: items.map((item) => ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: item.title, subtitle: item.subtitle, style: { flex: "1 1 240px" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", gap: theme_1.spacing.xs, flexWrap: "wrap" }, children: [item.badges.map((badge) => ((0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: badge }, badge))), item.score !== undefined && ((0, jsx_runtime_1.jsx)(primitives_1.StatusChip, { label: `AI Rating ${item.score}`, tone: item.score >= 70 ? "success" : item.score >= 45 ? "warning" : "danger" }))] }), item.detail && ((0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md, color: theme_1.colors.inkMuted, fontSize: theme_1.typography.sizes.sm }, children: item.detail }))] }, item.id))) }));
}


/***/ },

/***/ 560
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
class ErrorBoundary extends react_1.Component {
    state = {
        error: null
    };
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error, info) {
        console.error("[RK Flow] Screen crashed.", {
            message: error.message,
            stack: error.stack,
            componentStack: info.componentStack
        });
    }
    componentDidUpdate(prevProps) {
        if (this.state.error &&
            this.props.resetKey &&
            this.props.resetKey !== prevProps.resetKey) {
            this.setState({ error: null });
        }
    }
    render() {
        if (!this.state.error) {
            return this.props.children;
        }
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: "This screen hit an error", subtitle: this.state.error.message, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.inkMuted, lineHeight: 1.6 }, children: "The rest of the panel is still available. Switch modules or retry this screen after fixing the underlying data or code path." }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: theme_1.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: () => this.setState({ error: null }), children: "Retry Screen" }) })] }));
    }
}
exports["default"] = ErrorBoundary;


/***/ },

/***/ 1257
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = ExecutionPreviewModal;
const jsx_runtime_1 = __webpack_require__(4848);
const react_1 = __webpack_require__(6540);
const PreviewGate_1 = __webpack_require__(1016);
const primitives_1 = __webpack_require__(5613);
const theme_1 = __webpack_require__(3877);
const DESTRUCTIVE_NOTES = "This will send Premiere actions through the live executor. Review before continuing.";
function ExecutionPreviewModal() {
    const [request, setRequest] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        return (0, PreviewGate_1.subscribeExecutionPreview)(setRequest);
    }, []);
    if (!request) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
            padding: theme_1.spacing.lg
        }, children: (0, jsx_runtime_1.jsxs)(primitives_1.Card, { title: `Preview: ${request.summary}`, subtitle: DESTRUCTIVE_NOTES, style: { width: "min(640px, 100%)" }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                        maxHeight: 320,
                        overflow: "auto",
                        borderRadius: 10,
                        border: `1px solid ${theme_1.colors.border}`,
                        background: theme_1.colors.white,
                        padding: theme_1.spacing.sm
                    }, children: (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: theme_1.spacing.sm }, children: request.commands.map((command) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                                borderBottom: `1px solid ${theme_1.colors.border}`,
                                paddingBottom: theme_1.spacing.sm
                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: theme_1.colors.maroonDeep, fontWeight: 700 }, children: command.action }), (0, jsx_runtime_1.jsx)("pre", { style: {
                                        margin: `${theme_1.spacing.xs}px 0 0`,
                                        color: theme_1.colors.inkMuted,
                                        fontSize: theme_1.typography.sizes.xs,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word"
                                    }, children: JSON.stringify(command.payload, null, 2) })] }, command.id))) }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", justifyContent: "flex-end", gap: theme_1.spacing.sm, marginTop: theme_1.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: PreviewGate_1.rejectExecutionPreview, children: "Cancel" }), (0, jsx_runtime_1.jsx)(primitives_1.Button, { onClick: PreviewGate_1.approveExecutionPreview, children: "Confirm" })] })] }) }));
}


/***/ },

/***/ 3877
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(5491), exports);


/***/ },

/***/ 5613
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.Card = Card;
exports.Button = Button;
exports.IconButton = IconButton;
exports.StatusChip = StatusChip;
exports.ProgressBar = ProgressBar;
exports.Input = Input;
exports.Textarea = Textarea;
exports.Tabs = Tabs;
__webpack_unused_export__ = Modal;
exports.ScrollArea = ScrollArea;
const jsx_runtime_1 = __webpack_require__(4848);
const tokens_1 = __webpack_require__(5491);
function Card({ title, subtitle, children, style }) {
    return ((0, jsx_runtime_1.jsxs)("section", { style: {
            background: tokens_1.colors.panel,
            border: `1px solid ${tokens_1.colors.border}`,
            borderRadius: tokens_1.radius.lg,
            boxShadow: tokens_1.shadows.soft,
            padding: tokens_1.spacing.lg,
            minWidth: 0,
            ...style
        }, children: [title && ((0, jsx_runtime_1.jsx)("h3", { style: {
                    margin: 0,
                    color: tokens_1.colors.maroonDeep,
                    fontFamily: tokens_1.typography.heading,
                    fontSize: tokens_1.typography.sizes.lg
                }, children: title })), subtitle && ((0, jsx_runtime_1.jsx)("p", { style: {
                    margin: `${tokens_1.spacing.xs}px 0 0`,
                    color: tokens_1.colors.inkMuted,
                    fontSize: tokens_1.typography.sizes.sm
                }, children: subtitle })), children && (0, jsx_runtime_1.jsx)("div", { style: { marginTop: title || subtitle ? tokens_1.spacing.md : 0 }, children: children })] }));
}
function Button({ children, variant = "primary", style, ...props }) {
    const variants = {
        primary: {
            background: tokens_1.colors.maroon,
            color: tokens_1.colors.white,
            border: `1px solid ${tokens_1.colors.maroon}`
        },
        secondary: {
            background: tokens_1.colors.panelMuted,
            color: tokens_1.colors.maroonDeep,
            border: `1px solid ${tokens_1.colors.border}`
        },
        ghost: {
            background: "transparent",
            color: tokens_1.colors.ink,
            border: `1px solid ${tokens_1.colors.border}`
        }
    };
    return ((0, jsx_runtime_1.jsx)("button", { ...props, style: {
            borderRadius: tokens_1.radius.md,
            padding: `${tokens_1.spacing.sm}px ${tokens_1.spacing.md}px`,
            fontSize: tokens_1.typography.sizes.sm,
            fontWeight: 600,
            cursor: props.disabled ? "not-allowed" : "pointer",
            boxSizing: "border-box",
            ...variants[variant],
            ...style
        }, children: children }));
}
function IconButton({ children, ...props }) {
    return ((0, jsx_runtime_1.jsx)(Button, { ...props, variant: "ghost", style: {
            width: 40,
            height: 40,
            padding: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            ...props.style
        }, children: children }));
}
function StatusChip({ label, tone = "neutral" }) {
    const toneMap = {
        neutral: { bg: tokens_1.colors.panelMuted, fg: tokens_1.colors.ink },
        success: { bg: "#E5F5EC", fg: tokens_1.colors.success },
        warning: { bg: "#FAF0D8", fg: tokens_1.colors.warning },
        danger: { bg: "#F8E0DE", fg: tokens_1.colors.danger }
    };
    return ((0, jsx_runtime_1.jsx)("span", { style: {
            display: "inline-flex",
            alignItems: "center",
            gap: tokens_1.spacing.xs,
            borderRadius: tokens_1.radius.pill,
            padding: "6px 10px",
            background: toneMap[tone].bg,
            color: toneMap[tone].fg,
            fontSize: tokens_1.typography.sizes.xs,
            fontWeight: 700
        }, children: normalizeChipLabel(label) }));
}
function ProgressBar({ value, label }) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: tokens_1.spacing.xs }, children: [label && ((0, jsx_runtime_1.jsx)("div", { style: { color: tokens_1.colors.inkMuted, fontSize: tokens_1.typography.sizes.sm }, children: label })), (0, jsx_runtime_1.jsx)("div", { style: {
                    height: 10,
                    background: tokens_1.colors.cream,
                    borderRadius: tokens_1.radius.pill,
                    overflow: "hidden"
                }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                        width: `${Math.max(0, Math.min(100, value))}%`,
                        height: "100%",
                        background: `linear-gradient(90deg, ${tokens_1.colors.gold}, ${tokens_1.colors.maroon})`
                    } }) })] }));
}
function normalizeChipLabel(value) {
    return typeof value === "string" ? value : String(value);
}
function Input(props) {
    const common = {
        width: "100%",
        boxSizing: "border-box",
        borderRadius: tokens_1.radius.md,
        border: `1px solid ${tokens_1.colors.border}`,
        background: tokens_1.colors.white,
        color: tokens_1.colors.ink,
        padding: `${tokens_1.spacing.sm}px ${tokens_1.spacing.md}px`,
        fontSize: tokens_1.typography.sizes.sm
    };
    if (props.multiline) {
        return (0, jsx_runtime_1.jsx)("textarea", { ...props, style: { ...common, resize: "vertical", ...props.style } });
    }
    return (0, jsx_runtime_1.jsx)("input", { ...props, style: { ...common, ...props.style } });
}
function Textarea({ rows = 5, style, ...props }) {
    return ((0, jsx_runtime_1.jsx)("textarea", { ...props, rows: rows, style: {
            display: "block",
            width: "100%",
            minHeight: 128,
            boxSizing: "border-box",
            borderRadius: tokens_1.radius.md,
            border: `1px solid ${tokens_1.colors.border}`,
            background: tokens_1.colors.white,
            color: tokens_1.colors.ink,
            padding: `${tokens_1.spacing.sm}px ${tokens_1.spacing.md}px`,
            fontSize: tokens_1.typography.sizes.sm,
            fontFamily: "inherit",
            lineHeight: 1.5,
            resize: "vertical",
            ...style
        } }));
}
function Tabs({ items, active, onChange }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", gap: tokens_1.spacing.xs, flexWrap: "wrap" }, children: items.map((item) => ((0, jsx_runtime_1.jsx)(Button, { variant: item.id === active ? "primary" : "secondary", onClick: () => onChange(item.id), children: item.label }, item.id))) }));
}
function Modal({ open, title, children }) {
    if (!open) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            position: "fixed",
            inset: 0,
            background: "rgba(43,35,32,0.24)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: tokens_1.spacing.lg
        }, children: (0, jsx_runtime_1.jsx)(Card, { title: title, style: { width: "min(560px, 100%)" }, children: children }) }));
}
function ScrollArea({ children, style }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            overflow: "auto",
            minWidth: 0,
            minHeight: 0,
            ...style
        }, children: children }));
}


/***/ },

/***/ 5491
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typography = exports.shadows = exports.radius = exports.spacing = exports.colors = void 0;
exports.colors = {
    ivory: "#F7F1E8",
    cream: "#EFE4D2",
    parchment: "#E3D2BA",
    maroon: "#6C2230",
    maroonDeep: "#4A1621",
    gold: "#B28A4A",
    goldSoft: "#D6BC84",
    ink: "#2B2320",
    inkMuted: "#5A4B44",
    border: "#D9C9B4",
    panel: "#FFF9F2",
    panelMuted: "#F6EEE3",
    white: "#FFFFFF",
    success: "#2E7D5B",
    warning: "#A06C16",
    danger: "#A23A35",
    shadow: "rgba(78, 46, 32, 0.12)",
    shadowHeavy: "rgba(78, 46, 32, 0.18)"
};
exports.spacing = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40
};
exports.radius = {
    sm: 8,
    md: 10,
    lg: 12,
    xl: 18,
    pill: 999
};
exports.shadows = {
    soft: `0 8px 24px ${exports.colors.shadow}`,
    raised: `0 14px 32px ${exports.colors.shadowHeavy}`
};
exports.typography = {
    heading: "\"Iowan Old Style\", \"Palatino Linotype\", \"Book Antiqua\", Georgia, serif",
    body: "\"Avenir Next\", \"Segoe UI\", Helvetica, Arial, sans-serif",
    sizes: {
        xs: 12,
        sm: 13,
        md: 15,
        lg: 18,
        xl: 24,
        xxl: 32
    }
};


/***/ },

/***/ 8244
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ createLucideIcon)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
;// ./node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();


//# sourceMappingURL=mergeClasses.mjs.map

;// ./node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();


//# sourceMappingURL=toKebabCase.mjs.map

;// ./node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);


//# sourceMappingURL=toCamelCase.mjs.map

;// ./node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};


//# sourceMappingURL=toPascalCase.mjs.map

;// ./node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};


//# sourceMappingURL=defaultAttributes.mjs.map

;// ./node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};


//# sourceMappingURL=hasA11yProp.mjs.map

;// ./node_modules/lucide-react/dist/esm/context.mjs
/* unused harmony import specifier */ var useMemo;
/* unused harmony import specifier */ var createElement;

"use client";
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const LucideContext = (0,react.createContext)({});
function LucideProvider({
  children,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  className
}) {
  const value = useMemo(
    () => ({
      size,
      color,
      strokeWidth,
      absoluteStrokeWidth,
      className
    }),
    [size, color, strokeWidth, absoluteStrokeWidth, className]
  );
  return createElement(LucideContext.Provider, { value }, children);
}
const useLucideContext = () => (0,react.useContext)(LucideContext);


//# sourceMappingURL=context.mjs.map

;// ./node_modules/lucide-react/dist/esm/Icon.mjs

"use client";
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */







const Icon = (0,react.forwardRef)(
  ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      color: contextColor = "currentColor",
      className: contextClass = ""
    } = useLucideContext() ?? {};
    const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
    return (0,react.createElement)(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size ?? contextSize ?? defaultAttributes.width,
        height: size ?? contextSize ?? defaultAttributes.height,
        stroke: color ?? contextColor,
        strokeWidth: calculatedStrokeWidth,
        className: mergeClasses("lucide", contextClass, className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => (0,react.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);


//# sourceMappingURL=Icon.mjs.map

;// ./node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */







const createLucideIcon = (iconName, iconNode) => {
  const Component = (0,react.forwardRef)(
    ({ className, ...props }, ref) => (0,react.createElement)(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};


//# sourceMappingURL=createLucideIcon.mjs.map


/***/ },

/***/ 7720
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("activity", __iconNode);


//# sourceMappingURL=activity.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Activity
/* harmony export */ ]);


/***/ },

/***/ 2731
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m14.31 8 5.74 9.94", key: "1y6ab4" }],
  ["path", { d: "M9.69 8h11.48", key: "1wxppr" }],
  ["path", { d: "m7.38 12 5.74-9.94", key: "1grp0k" }],
  ["path", { d: "M9.69 16 3.95 6.06", key: "libnyf" }],
  ["path", { d: "M14.31 16H2.83", key: "x5fava" }],
  ["path", { d: "m16.62 12-5.74 9.94", key: "1vwawt" }]
];
const Aperture = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("aperture", __iconNode);


//# sourceMappingURL=aperture.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Aperture
/* harmony export */ ]);


/***/ },

/***/ 5337
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M2 10v3", key: "1fnikh" }],
  ["path", { d: "M6 6v11", key: "11sgs0" }],
  ["path", { d: "M10 3v18", key: "yhl04a" }],
  ["path", { d: "M14 8v7", key: "3a1oy3" }],
  ["path", { d: "M18 5v13", key: "123xd1" }],
  ["path", { d: "M22 10v3", key: "154ddg" }]
];
const AudioLines = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("audio-lines", __iconNode);


//# sourceMappingURL=audio-lines.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ AudioLines
/* harmony export */ ]);


/***/ },

/***/ 4288
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "M8 8h8", key: "1bis0t" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "m13 17-5-1h1a4 4 0 0 0 0-8", key: "nu2bwa" }]
];
const BadgeIndianRupee = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("badge-indian-rupee", __iconNode);


//# sourceMappingURL=badge-indian-rupee.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ BadgeIndianRupee
/* harmony export */ ]);


/***/ },

/***/ 622
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("bot", __iconNode);


//# sourceMappingURL=bot.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Bot
/* harmony export */ ]);


/***/ },

/***/ 6666
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
      key: "18u6gg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("camera", __iconNode);


//# sourceMappingURL=camera.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Camera
/* harmony export */ ]);


/***/ },

/***/ 7937
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "18", height: "14", x: "3", y: "5", rx: "2", ry: "2", key: "12ruh7" }],
  ["path", { d: "M7 15h4M15 15h2M7 11h2M13 11h4", key: "1ueiar" }]
];
const Captions = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("captions", __iconNode);


//# sourceMappingURL=captions.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Captions
/* harmony export */ ]);


/***/ },

/***/ 7146
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "m12.296 3.464 3.02 3.956", key: "qash78" }],
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z", key: "1h7j8b" }
  ],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "4lm6w1" }],
  ["path", { d: "m6.18 5.276 3.1 3.899", key: "zjj9t3" }]
];
const Clapperboard = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("clapperboard", __iconNode);


//# sourceMappingURL=clapperboard.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Clapperboard
/* harmony export */ ]);


/***/ },

/***/ 7379
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("download", __iconNode);


//# sourceMappingURL=download.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Download
/* harmony export */ ]);


/***/ },

/***/ 6913
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("film", __iconNode);


//# sourceMappingURL=film.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Film
/* harmony export */ ]);


/***/ },

/***/ 3705
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
];
const FolderKanban = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("folder-kanban", __iconNode);


//# sourceMappingURL=folder-kanban.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ FolderKanban
/* harmony export */ ]);


/***/ },

/***/ 5905
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
      key: "17lmqv"
    }
  ]
];
const HeartHandshake = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("heart-handshake", __iconNode);


//# sourceMappingURL=heart-handshake.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ HeartHandshake
/* harmony export */ ]);


/***/ },

/***/ 2654
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("layout-dashboard", __iconNode);


//# sourceMappingURL=layout-dashboard.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ LayoutDashboard
/* harmony export */ ]);


/***/ },

/***/ 1696
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
];
const MicVocal = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("mic-vocal", __iconNode);


//# sourceMappingURL=mic-vocal.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ MicVocal
/* harmony export */ ]);


/***/ },

/***/ 5205
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "m14.305 7.53.923-.382", key: "1mlnsw" }],
  ["path", { d: "m15.228 4.852-.923-.383", key: "82mpwg" }],
  ["path", { d: "m16.852 3.228-.383-.924", key: "ln4sir" }],
  ["path", { d: "m16.852 8.772-.383.923", key: "1dejw0" }],
  ["path", { d: "m19.148 3.228.383-.924", key: "192kgf" }],
  ["path", { d: "m19.53 9.696-.382-.924", key: "fiavlr" }],
  ["path", { d: "m20.772 4.852.924-.383", key: "1j8mgp" }],
  ["path", { d: "m20.772 7.148.924.383", key: "zix9be" }],
  ["path", { d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7", key: "1tnzv8" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }]
];
const MonitorCog = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("monitor-cog", __iconNode);


//# sourceMappingURL=monitor-cog.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ MonitorCog
/* harmony export */ ]);


/***/ },

/***/ 307
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["path", { d: "m9 9 12-2", key: "1e64n2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music4 = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("music-4", __iconNode);


//# sourceMappingURL=music-4.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Music4
/* harmony export */ ]);


/***/ },

/***/ 5832
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("palette", __iconNode);


//# sourceMappingURL=palette.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Palette
/* harmony export */ ]);


/***/ },

/***/ 7002
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }]
];
const ScanFace = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("scan-face", __iconNode);


//# sourceMappingURL=scan-face.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ ScanFace
/* harmony export */ ]);


/***/ },

/***/ 5758
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
const Scissors = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("scissors", __iconNode);


//# sourceMappingURL=scissors.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Scissors
/* harmony export */ ]);


/***/ },

/***/ 8993
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("send", __iconNode);


//# sourceMappingURL=send.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Send
/* harmony export */ ]);


/***/ },

/***/ 3588
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("settings", __iconNode);


//# sourceMappingURL=settings.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Settings
/* harmony export */ ]);


/***/ },

/***/ 5654
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("sparkles", __iconNode);


//# sourceMappingURL=sparkles.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Sparkles
/* harmony export */ ]);


/***/ },

/***/ 692
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M10 2h4", key: "n1abiw" }],
  ["path", { d: "M12 14v-4", key: "1evpnu" }],
  ["path", { d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6", key: "1ts96g" }],
  ["path", { d: "M9 17H4v5", key: "8t5av" }]
];
const TimerReset = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("timer-reset", __iconNode);


//# sourceMappingURL=timer-reset.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ TimerReset
/* harmony export */ ]);


/***/ },

/***/ 1085
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("users", __iconNode);


//# sourceMappingURL=users.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ Users
/* harmony export */ ]);


/***/ },

/***/ 9404
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8244);
/**
 * @license lucide-react v1.27.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M2 12q2.5 2 5 0t5 0 5 0 5 0", key: "8ddzzs" }],
  ["path", { d: "M2 19q2.5 2 5 0t5 0 5 0 5 0", key: "1wj4st" }],
  ["path", { d: "M2 5q2.5 2 5 0t5 0 5 0 5 0", key: "69x50u" }]
];
const WavesHorizontal = (0,_createLucideIcon_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("waves-horizontal", __iconNode);


//# sourceMappingURL=waves-horizontal.mjs.map

/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "__iconNode", 0, /* binding */ __iconNode,
/* harmony export */   "default", 0, /* binding */ WavesHorizontal
/* harmony export */ ]);


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	let __webpack_exports__ = __webpack_require__(3900);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map