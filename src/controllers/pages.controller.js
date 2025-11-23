import path from "path";

export const renderHome = (req, res) => {
res.sendFile(path.join(process.cwd(), "src/views/index.html"));
};

export const renderAbout = (req, res) => {
res.sendFile(path.join(process.cwd(), "src/views/about.html"));
};
