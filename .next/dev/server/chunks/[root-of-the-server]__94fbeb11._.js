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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

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
    ()=>getFolders
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
const ROOT_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "uploads");
// Ensure root directory exists
if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(ROOT_DIR)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(ROOT_DIR, {
        recursive: true
    }).catch(console.error);
}
function getAbsolutePath(relativePath) {
    if (!relativePath || relativePath === "root") {
        return ROOT_DIR;
    }
    // Prevent directory traversal
    const safePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].normalize(relativePath).replace(/^(\.\.[\/\\])+/, "");
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(ROOT_DIR, safePath);
}
function getRelativePath(absolutePath) {
    const relative = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].relative(ROOT_DIR, absolutePath);
    return relative === "" ? "root" : relative;
}
async function getFiles(folderId = null) {
    const dirPath = getAbsolutePath(folderId);
    try {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(dirPath, {
            withFileTypes: true
        });
        const files = [];
        for (const entry of entries){
            if (entry.isFile()) {
                const stats = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].stat(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dirPath, entry.name));
                files.push({
                    id: getRelativePath(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dirPath, entry.name)),
                    name: entry.name,
                    originalName: entry.name,
                    size: stats.size,
                    compressedSize: stats.size,
                    type: "application/octet-stream",
                    folderId: folderId === "root" ? null : folderId,
                    createdAt: stats.birthtime
                });
            }
        }
        return files.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
        console.error("Error reading files:", error);
        return [];
    }
}
async function getAllFiles() {
    // Recursive function to get all files
    async function traverse(dir) {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(dir, {
            withFileTypes: true
        });
        let results = [];
        for (const entry of entries){
            const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, entry.name);
            if (entry.isDirectory()) {
                results = results.concat(await traverse(fullPath));
            } else {
                const stats = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].stat(fullPath);
                results.push({
                    id: getRelativePath(fullPath),
                    name: entry.name,
                    originalName: entry.name,
                    size: stats.size,
                    compressedSize: stats.size,
                    type: "application/octet-stream",
                    folderId: getRelativePath(dir) === "root" ? null : getRelativePath(dir),
                    createdAt: stats.birthtime
                });
            }
        }
        return results;
    }
    try {
        const files = await traverse(ROOT_DIR);
        return files.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
        console.error("Error getting all files:", error);
        return [];
    }
}
async function getFile(id) {
    const filePath = getAbsolutePath(id);
    try {
        const stats = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].stat(filePath);
        return {
            id: id,
            name: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(id),
            originalName: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(id),
            size: stats.size,
            compressedSize: stats.size,
            type: "application/octet-stream",
            folderId: getRelativePath(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(filePath)) === "root" ? null : getRelativePath(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(filePath)),
            createdAt: stats.birthtime
        };
    } catch  {
        return undefined;
    }
}
async function addFile(file, buffer) {
    const folderPath = getAbsolutePath(file.folderId);
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(folderPath, file.name);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, buffer);
}
async function deleteFile(id) {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].unlink(getAbsolutePath(id));
        return true;
    } catch  {
        return false;
    }
}
async function getFolders(parentId = null) {
    const dirPath = getAbsolutePath(parentId);
    try {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readdir(dirPath, {
            withFileTypes: true
        });
        const folders = [];
        for (const entry of entries){
            if (entry.isDirectory()) {
                const stats = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].stat(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dirPath, entry.name));
                folders.push({
                    id: getRelativePath(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dirPath, entry.name)),
                    name: entry.name,
                    parentId: parentId === "root" ? null : parentId,
                    createdAt: stats.birthtime
                });
            }
        }
        return folders.sort((a, b)=>a.name.localeCompare(b.name));
    } catch (error) {
        console.error("Error reading folders:", error);
        return [];
    }
}
async function getFolder(id) {
    const folderPath = getAbsolutePath(id);
    try {
        const stats = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].stat(folderPath);
        if (!stats.isDirectory()) return undefined;
        return {
            id: id,
            name: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(id),
            parentId: getRelativePath(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(folderPath)) === "root" ? null : getRelativePath(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(folderPath)),
            createdAt: stats.birthtime
        };
    } catch  {
        return undefined;
    }
}
async function addFolder(folder) {
    const parentPath = getAbsolutePath(folder.parentId);
    const folderPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(parentPath, folder.name);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(folderPath, {
        recursive: true
    });
}
async function deleteFolder(id) {
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].rm(getAbsolutePath(id), {
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
    if (!folderId || folderId === "root") return breadcrumbs;
    let currentPath = folderId;
    while(currentPath && currentPath !== "root"){
        const folder = await getFolder(currentPath);
        if (folder) {
            breadcrumbs.unshift(folder);
            // Move up one level
            const parentDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(currentPath);
            currentPath = parentDir === "." ? "root" : parentDir;
        } else {
            break;
        }
    }
    return breadcrumbs;
}
}),
"[project]/landrop/app/api/folders/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/landrop/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/landrop/lib/file-store.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    const { id } = await params;
    const folder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFolder"])(id);
    if (!folder) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Folder not found"
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(folder);
}
async function DELETE(request, { params }) {
    const { id } = await params;
    if (id === "root") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Cannot delete root folder"
        }, {
            status: 400
        });
    }
    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteFolder"])(id);
    if (!success) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Folder not found"
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__94fbeb11._.js.map