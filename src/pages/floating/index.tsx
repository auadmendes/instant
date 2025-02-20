import { Header } from "../../components/header";
import Template from "../../components/template";


function Floating() {

  return (
    <div className="bg-slate-50/80 flex flex-col w-full min-w-[430px] h-[650px] rounded gap-2 overflow-auto scrollbar-hidden">
      <Header />
      <div className="w-full flex justify-around">
        <span>Templates</span>
        <span>Automations</span>
      </div>
      <Template />
    </div>
  );
}

export default Floating