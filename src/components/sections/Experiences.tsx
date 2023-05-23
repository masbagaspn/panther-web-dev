import { useContext, useRef, useEffect } from "react";

import experiences from "../../data/experience.json";

import Tags from "../Tags";
import Card from "../commons/Card";
import Section from "../commons/Section";
import { AppContext } from "../../App";

import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useWindowSize from "../../hooks/useWindowSize";

const Experiences = () => {
  const { width } = useWindowSize();
  const context = useContext(AppContext);

  const experiencesRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(experiencesRef, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      context?.setSectionInView("experiences");
    }
  }, [width, isVisible, context]);

  return (
    <Section title="EXPERIENCES">
      <div
        ref={experiencesRef}
        className="flex flex-col gap-10 sm:gap-16 xl:gap-24"
      >
        {experiences.map((exp, idx) => (
          <Card key={idx}>
            <div className="flex flex-col sm:flex-row sm:gap-8 lg:flex-col">
              <span className="text-xs text-neutral-100/50 uppercase sm:w-1/4 sm:text-sm lg:w-full xl:text-lg">
                {exp.date.joinedDate} — {exp.date.endDate}
              </span>
              <div className="flex flex-col mt-1 font-semibold text-lime-400 gap-1.5 xl:gap-4 2xl:gap-8 sm:w-3/4 sm:text-2xl sm:mt-0 lg:mt-4 lg:w-full xl:text-3xl xl:mt-6">
                <h3>
                  {exp.as} ·<span>{` ${exp.company}`}</span>
                </h3>
                {exp?.contract !== null && (
                  <span className="text-neutral-100/50 sm:text-xl font-light xl:text-2xl ">
                    {exp.contract}
                  </span>
                )}
                <p className="mt-8 font-light text-sm text-neutral-100 lg:text-base xl:text-xl xl:leading-7">
                  {exp.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2 lg:gap-3 xl:gap-4">
                  {exp.stacks.map((stack, idx) => (
                    <Tags key={idx}>
                      <span>{stack}</span>
                    </Tags>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Experiences;
