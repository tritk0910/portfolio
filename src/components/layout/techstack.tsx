import { techStacks } from "@/lib/constant";
import Card from "../custom/card";
import { Badge } from "../ui/badge";

export default function TechStack() {
  return (
    <Card
      className="group/card min-h-0 font-mono md:col-span-2 md:row-span-8"
      innerClassName="flex flex-col overflow-y-hidden"
    >
      <div className="p-3 text-5xl leading-12 font-bold uppercase">
        <h1 className="pb-2 text-4xl">
          <span className="pr-1">{"{"}</span>
          <span className="transition-all group-hover/card:pl-3">{"}"}</span>
        </h1>
        <p className="whitespace-pre-line">Tech {"\n"}Stack</p>
      </div>
      <div className="h-1 w-0 rounded-lg bg-white transition-all duration-500 group-hover/card:w-[80%]" />
      <div className="overflow-y-auto">
        {Object.entries(techStacks[0]).map(([category, technologies]) => (
          <div key={category} className="font-space p-4">
            <h2>{category}:</h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge variant="secondary" key={index}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
