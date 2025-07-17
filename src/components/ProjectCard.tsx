  import Image, { StaticImageData } from "next/image";
  import { Github, ExternalLink } from "lucide-react";

  interface ProjectCardProps {
    title: string;
    emoji: string;
    description: string;
    stack: string[];
    liveUrl: string;
    githubUrl: string;
    image: StaticImageData | string;
  }

  export const ProjectCard = ({
    title,
    emoji,
    description,
    stack,
    liveUrl,
    githubUrl,
    image,
  }: ProjectCardProps) => {
    return (
      <div className="bg-neutral-800 rounded-2xl p-4 hover:shadow-md transition-shadow">
        <div className="w-full h-32 bg-neutral-700 rounded-xl mb-3 flex items-center justify-center">
          <Image
            width={60}
            height={60}
            src={typeof image === "string" ? image : image.src}
            alt={`${title} preview`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div>
          <h3 className="text-base font-bold mb-1 flex items-center text-neutral-100">
            {title} <span className="ml-2">{emoji}</span>
          </h3>
          <p className="text-xs text-neutral-300 mb-3">{description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs bg-accent px-3 py-1 rounded hover:bg-opacity-80 group transition-all  duration-200"
            >
              <ExternalLink size={12} className="text-neutral-900 transition-all  duration-300" /> 
              <span className=" text-neutral-900 transition-all  duration-200">
                Live Demo
                </span> 
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs border border-accent text-accent px-3 py-1 rounded hover:bg-accent hover:text-white group transition-colors"
            >
              <Github className="group-hover:text-black" size={12} /> 
              <span className="group-hover:text-black">
                Code
                </span>
            </a>
          </div>
        </div>
      </div>
    );
  };
