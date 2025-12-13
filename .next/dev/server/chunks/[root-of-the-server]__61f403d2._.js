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
// In-memory store (persists during server runtime)
const files = new Map();
const folders = new Map();
// Initialize with root folder
folders.set("root", {
    id: "root",
    name: "Root",
    parentId: null,
    createdAt: new Date()
});
function getFiles(folderId = null) {
    return Array.from(files.values()).filter((f)=>f.folderId === folderId).sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
function getAllFiles() {
    return Array.from(files.values()).sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime());
}
function getFile(id) {
    return files.get(id);
}
function addFile(file) {
    files.set(file.id, file);
}
function deleteFile(id) {
    return files.delete(id);
}
function getFolders(parentId = null) {
    return Array.from(folders.values()).filter((f)=>f.parentId === parentId && f.id !== "root").sort((a, b)=>a.name.localeCompare(b.name));
}
function getFolder(id) {
    return folders.get(id);
}
function addFolder(folder) {
    folders.set(folder.id, folder);
}
function deleteFolder(id) {
    // Delete all files in folder
    const folderFiles = getFiles(id);
    folderFiles.forEach((f)=>files.delete(f.id));
    // Delete all subfolders recursively
    const subfolders = getFolders(id);
    subfolders.forEach((sf)=>deleteFolder(sf.id));
    return folders.delete(id);
}
function getBreadcrumbs(folderId) {
    const breadcrumbs = [];
    let currentId = folderId;
    while(currentId){
        const folder = folders.get(currentId);
        if (folder) {
            breadcrumbs.unshift(folder);
            currentId = folder.parentId;
        } else {
            break;
        }
    }
    return breadcrumbs;
}
}),
"[project]/landrop/app/api/folders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/landrop/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/landrop/lib/file-store.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const parentId = searchParams.get("parentId");
    const breadcrumbs = searchParams.get("breadcrumbs");
    if (breadcrumbs) {
        const crumbs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBreadcrumbs"])(breadcrumbs);
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(crumbs);
    }
    const folders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFolders"])(parentId);
    return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(folders);
}
async function POST(request) {
    try {
        const body = await request.json();
        const { name, parentId } = body;
        if (!name) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Folder name required"
            }, {
                status: 400
            });
        }
        const folder = {
            id: crypto.randomUUID(),
            name,
            parentId: parentId || null,
            createdAt: new Date()
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$lib$2f$file$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addFolder"])(folder);
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(folder);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$landrop$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create folder"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__61f403d2._.js.map