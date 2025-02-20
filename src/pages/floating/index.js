import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "../../components/header";
import Template from "../../components/template";
function Floating() {
    return (_jsxs("div", { className: "bg-slate-50/80 flex flex-col w-full min-w-[430px] h-[650px] rounded gap-2 overflow-auto scrollbar-hidden", children: [_jsx(Header, {}), _jsxs("div", { className: "w-full flex justify-around", children: [_jsx("span", { children: "Templates" }), _jsx("span", { children: "Automations" })] }), _jsx(Template, {})] }));
}
export default Floating;
