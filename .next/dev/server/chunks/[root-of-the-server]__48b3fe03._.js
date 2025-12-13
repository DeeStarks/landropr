module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/landrop/lib/file-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addFile",
    ()=>addFile,
    "addFolder",
    ()=>addFolder,
    "deleteFile",
    ()=>deleteFile,
    "deleteFolder",
    ()=>deleteFolder,
    "getAllFiles",
    ()=>getAllFiles,
    "getBreadcrumbs",
    ()=>getBreadcrumbs,
    "getFile",
    ()=>getFile,
    "getFiles",
    ()=>getFiles,
    "getFolder",
    ()=>getFolder,
    "getFolders",
    ()=>getFolders,
    "searchFiles",
    ()=>searchFiles
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/zlib [external] (zlib, cjs)");
;
;
;
;
const gzip = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["gzip"]);
const ROOT_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "uploads");
// Ensure root directory exists
const ensureRoot = async ()=>{
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(ROOT_DIR);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(ROOT_DIR, {
            recursive: true
        });
    }
};
ensureRoot();
async function getFiles(folderId) {
    await ensureRoot();
    const targetDir = folderId ? __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, folderId) : ROOT_DIR;
    try {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(targetDir, {
            withFileTypes: true
        });
        const files = [];
        for (const entry of entries){
            if (entry.isFile() && entry.name.endsWith(".json")) {
                const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(targetDir, entry.name), "utf-8");
                try {
                    const fileData = JSON.parse(content);
                    // Ensure id is relative path from ROOT_DIR
                    const relativePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(ROOT_DIR, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(targetDir, entry.name.replace(".json", "")));
                    files.push({
                        ...fileData,
                        id: relativePath
                    });
                } catch (e) {
                    console.error(`Error parsing file metadata: ${entry.name}`, e);
                }
            }
        }
        return files;
    } catch (e) {
        console.error("Error reading directory:", e);
        return [];
    }
}
async function getAllFiles() {
    return getFiles(null);
}
async function getFile(id) {
    await ensureRoot();
    const metaPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, id + ".json");
    try {
        const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(metaPath, "utf-8");
        const fileData = JSON.parse(content);
        return {
            ...fileData,
            id
        };
    } catch  {
        return undefined;
    }
}
async function addFile(file, buffer) {
    await ensureRoot();
    const targetDir = file.folderId ? __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, file.folderId) : ROOT_DIR;
    // Ensure target directory exists
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(targetDir);
    } catch  {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(targetDir, {
            recursive: true
        });
    }
    // Compress data
    const compressedBuffer = await gzip(buffer);
    file.compressedSize = compressedBuffer.length;
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(targetDir, file.name);
    const metaPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(targetDir, file.name + ".json");
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, compressedBuffer);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(metaPath, JSON.stringify(file, null, 2));
}
async function deleteFile(id) {
    await ensureRoot();
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, id);
    const metaPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, id + ".json");
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].unlink(filePath);
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].unlink(metaPath);
        return true;
    } catch  {
        return false;
    }
}
async function getFolders(parentId) {
    await ensureRoot();
    const targetDir = parentId ? __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, parentId) : ROOT_DIR;
    try {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(targetDir, {
            withFileTypes: true
        });
        const folders = [];
        for (const entry of entries){
            if (entry.isDirectory()) {
                const folderPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(targetDir, entry.name);
                const relativePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(ROOT_DIR, folderPath);
                folders.push({
                    id: relativePath,
                    name: entry.name,
                    parentId: parentId,
                    createdAt: new Date()
                });
            }
        }
        return folders;
    } catch  {
        return [];
    }
}
async function getFolder(id) {
    await ensureRoot();
    const folderPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, id);
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].access(folderPath);
        return {
            id,
            name: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(id),
            parentId: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(id) === "." ? null : __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(id),
            createdAt: new Date()
        };
    } catch  {
        return undefined;
    }
}
async function addFolder(folder) {
    await ensureRoot();
    const targetDir = folder.parentId ? __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, folder.parentId, folder.name) : __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, folder.name);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(targetDir, {
        recursive: true
    });
}
async function deleteFolder(id) {
    await ensureRoot();
    const folderPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, id);
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].rm(folderPath, {
            recursive: true,
            force: true
        });
        return true;
    } catch  {
        return false;
    }
}
async function getBreadcrumbs(folderId) {
    const breadcrumbs = [];
    let currentId = folderId;
    while(currentId){
        const folder = await getFolder(currentId);
        if (folder) {
            breadcrumbs.unshift(folder);
            currentId = folder.parentId;
        } else {
            break;
        }
    }
    return breadcrumbs;
}
async function searchFiles(query) {
    await ensureRoot();
    const results = [];
    async function searchDir(dir) {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(dir, {
            withFileTypes: true
        });
        for (const entry of entries){
            const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, entry.name);
            if (entry.isDirectory()) {
                await searchDir(fullPath);
            } else if (entry.isFile() && entry.name.endsWith(".json")) {
                try {
                    const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(fullPath, "utf-8");
                    const fileData = JSON.parse(content);
                    if (fileData.name.toLowerCase().includes(query.toLowerCase())) {
                        const relativePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(ROOT_DIR, fullPath.replace(".json", ""));
                        results.push({
                            ...fileData,
                            id: relativePath
                        });
                    }
                } catch (e) {
                    console.error(`Error parsing file metadata during search: ${entry.name}`, e);
                }
            }
        }
    }
    await searchDir(ROOT_DIR);
    return results;
}
}),
"[project]/landrop/app/api/files/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/landrop/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/landrop/lib/file-store.ts [app-route] (ecmascript)");
const dynamic = "force-dynamic";
;
;
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get("folderId");
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
        const files = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchFiles"])(searchQuery);
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(files);
    }
    const files = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFiles"])(folderId || null);
    return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(files);
}
async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const folderId = formData.get("folderId");
        if (!file) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No file provided"
            }, {
                status: 400
            });
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileItem = {
            id: "",
            name: file.name,
            originalName: file.name,
            size: file.size,
            compressedSize: 0,
            type: file.type || "application/octet-stream",
            folderId: folderId || null,
            createdAt: new Date()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addFile"])(fileItem, buffer);
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(fileItem);
    } catch (e) {
        console.error(e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to upload file"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__48b3fe03._.js.map