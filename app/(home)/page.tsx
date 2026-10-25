"use client";

import { useState } from "react";
import { useHomepageContent, type ProjectArt } from "../homepage-content";

const projectArtClasses: Record<ProjectArt, string> = {
  solstice:
    "bg-[#d4c4a3] bg-[radial-gradient(circle_at_50%_44%,rgba(255,246,221,0.32),transparent_42%)] [&_.art-object]:rounded-[46%_54%_63%_37%/46%_40%_60%_54%] [&_.art-object]:bg-[radial-gradient(circle_at_31%_25%,#fff3cd,#e79453_24%,#b84736_48%,#572d31_76%)] [&_.art-object]:shadow-[inset_-20px_-18px_30px_rgba(30,16,18,0.55),inset_12px_12px_21px_rgba(255,242,207,0.38),24px_35px_50px_rgba(68,38,32,0.35)] [&_.art-object]:[transform:rotate(-16deg)_rotateY(-18deg)] [&_.art-object-detail]:inset-[-16%_-22%] [&_.art-object-detail]:border-[rgba(93,43,36,0.7)] [&_.art-object-detail]:rounded-full [&_.art-object-detail]:[transform:rotate(48deg)_rotateX(67deg)]",
  otherworld:
    "bg-[#8eaba0] bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,235,205,0.7),transparent_55%)] [&_.art-object]:w-[clamp(125px,16vw,205px)] [&_.art-object]:rounded-[29%_71%_36%_64%/55%_30%_70%_45%] [&_.art-object]:bg-[linear-gradient(140deg,#e4ebc8_0%,#b2cb8d_24%,#668b7a_56%,#324d51_100%)] [&_.art-object]:shadow-[inset_-25px_-25px_32px_rgba(18,44,45,0.54),inset_15px_12px_25px_rgba(255,255,255,0.58),22px_36px_50px_rgba(31,66,61,0.36)] [&_.art-object]:[transform:rotate(27deg)_rotateY(23deg)] [&_.art-object-detail]:inset-[10%_-16%] [&_.art-object-detail]:border-[rgba(244,255,214,0.7)] [&_.art-object-detail]:rounded-full [&_.art-object-detail]:[transform:rotate(-25deg)_rotateX(65deg)] [&_.art-orbit]:w-[65%] [&_.art-orbit]:h-[37%] [&_.art-orbit]:border-[rgba(233,251,207,0.7)] [&_.art-orbit]:[transform:rotate(25deg)_rotateX(69deg)]",
  "soft-forms":
    "bg-[#aea0bb] bg-[radial-gradient(ellipse_at_48%_44%,rgba(255,225,201,0.6),transparent_50%)] [&_.art-object]:rounded-[50%_50%_46%_54%/58%_59%_41%_42%] [&_.art-object]:bg-[radial-gradient(circle_at_29%_24%,#fff3dc,#e9b2a1_25%,#bc829b_52%,#675575_82%)] [&_.art-object]:shadow-[inset_-25px_-22px_34px_rgba(58,39,70,0.48),inset_14px_11px_22px_rgba(255,241,222,0.5),23px_34px_48px_rgba(53,44,59,0.4)] [&_.art-object]:[transform:rotate(-29deg)_rotateY(-20deg)] [&_.art-object-detail]:inset-[-20%_-4%] [&_.art-object-detail]:border-[rgba(74,53,80,0.7)] [&_.art-object-detail]:rounded-full [&_.art-object-detail]:[transform:rotate(55deg)_rotateX(72deg)]",
  "new-ritual":
    "bg-[#d7d2be] bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.7),transparent_48%)] [&_.art-object]:w-[clamp(115px,15vw,190px)] [&_.art-object]:rounded-[45%_55%_51%_49%] [&_.art-object]:bg-[linear-gradient(140deg,#edf0df_0%,#aab99a_28%,#627765_58%,#293c3a_100%)] [&_.art-object]:shadow-[inset_-24px_-20px_34px_rgba(13,30,27,0.64),inset_12px_13px_24px_rgba(255,255,255,0.7),25px_38px_54px_rgba(47,58,49,0.3)] [&_.art-object]:[transform:rotate(18deg)_rotateX(14deg)] [&_.art-object-detail]:inset-[12%_22%] [&_.art-object-detail]:border-l-[rgba(235,242,212,0.8)] [&_.art-object-detail]:border-r-[rgba(235,242,212,0.6)] [&_.art-object-detail]:rounded-full [&_.art-object-detail]:[transform:rotate(-30deg)_rotateY(63deg)]",
  daydream:
    "bg-[#d2a98f] bg-[radial-gradient(ellipse_at_50%_48%,rgba(255,224,198,0.78),transparent_49%)] [&_.art-object]:rounded-full [&_.art-object]:bg-[radial-gradient(circle_at_30%_25%,#fff1d6_0%,#edc797_21%,#d48779_49%,#814c60_80%)] [&_.art-object]:shadow-[inset_-24px_-22px_35px_rgba(69,37,52,0.54),inset_15px_12px_23px_rgba(255,243,211,0.64),23px_35px_50px_rgba(79,49,52,0.35)] [&_.art-object]:[transform:rotate(-18deg)_rotateY(20deg)] [&_.art-object-detail]:inset-[-10%_-18%] [&_.art-object-detail]:border-[rgba(115,61,65,0.7)] [&_.art-object-detail]:rounded-full [&_.art-object-detail]:[transform:rotate(39deg)_rotateX(70deg)]",
};

const projectPositionClasses = {
  active:
    "z-[3] opacity-100 [filter:none] [transform:translateX(-50%)_translateZ(80px)_rotateY(0deg)_scale(1)]",
  left:
    "z-[2] opacity-[0.58] [filter:saturate(0.65)_brightness(0.72)] [transform:translateX(-122%)_translateZ(-100px)_rotateY(17deg)_scale(0.88)] max-[760px]:[transform:translateX(-108%)_translateZ(-100px)_rotateY(17deg)_scale(0.86)] max-[420px]:[transform:translateX(-106%)_translateZ(-100px)_rotateY(17deg)_scale(0.84)]",
  right:
    "z-[2] opacity-[0.58] [filter:saturate(0.65)_brightness(0.72)] [transform:translateX(22%)_translateZ(-100px)_rotateY(-17deg)_scale(0.88)] max-[760px]:[transform:translateX(8%)_translateZ(-100px)_rotateY(-17deg)_scale(0.86)] max-[420px]:[transform:translateX(6%)_translateZ(-100px)_rotateY(-17deg)_scale(0.84)]",
  "left-far":
    "z-[1] opacity-0 pointer-events-none [transform:translateX(-160%)_translateZ(-220px)_rotateY(25deg)_scale(0.76)] max-[760px]:[transform:translateX(-145%)_translateZ(-220px)_rotateY(25deg)_scale(0.76)]",
  "right-far":
    "z-[1] opacity-0 pointer-events-none [transform:translateX(60%)_translateZ(-220px)_rotateY(-25deg)_scale(0.76)] max-[760px]:[transform:translateX(45%)_translateZ(-220px)_rotateY(-25deg)_scale(0.76)]",
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`size-4.25 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path d="M4.5 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  const { content } = useHomepageContent();
  const [activeProject, setActiveProject] = useState(0);
  const activeProjectIndex = content.projects.length
    ? activeProject % content.projects.length
    : 0;

  function moveCarousel(direction: number) {
    if (content.projects.length === 0) return;
    setActiveProject((current) => (current + direction + content.projects.length) % content.projects.length);
  }

  function getPosition(index: number) {
    const offset = (index - activeProjectIndex + content.projects.length) % content.projects.length;
    if (offset === 0) return "active";
    if (offset === 1) return "right";
    if (offset === content.projects.length - 1) return "left";
    if (offset === 2) return "right-far";
    return "left-far";
  }

  return (
    <main>
      <header className="relative z-5 flex h-22 items-center justify-between border-b border-line px-[7.2%] max-[760px]:h-18 max-[760px]:px-[6%] min-[1500px]:px-[max(7.2%,calc((100vw-1320px)/2))]">
        <a className="inline-flex items-center gap-2.75 text-[15px] font-extrabold tracking-[0.16em] text-inherit no-underline" href="#home" aria-label="Forme home">
          <span className="inline-flex h-6 w-6.25 items-center gap-0.5 perspective-[80px]" aria-hidden="true">
            <i className="block h-4.5 w-1.75 skew-y-[-28deg] rotate-y-[-25deg] bg-acid [box-shadow:2px_2px_0_rgba(209,241,106,0.2)]" />
            <i className="block h-5.75 w-1.75 skew-y-28 rotate-y-25 bg-acid [box-shadow:2px_2px_0_rgba(209,241,106,0.2)]" />
            <i className="block h-[14px] w-[7px] -skew-y-[28deg] rotate-y-[-25deg] bg-acid [box-shadow:2px_2px_0_rgba(209,241,106,0.2)]" />
          </span>
          <span>{content.brandName}</span>
        </a>
        <nav className="ml-[70px] flex gap-[38px] max-[760px]:hidden" aria-label="Main navigation">
          <a className="text-[12px] text-[#c5c6bf] transition-colors duration-[180ms] hover:text-acid motion-reduce:transition-none" href="#work">{content.navWorkLabel}</a>
          <a className="text-[12px] text-[#c5c6bf] transition-colors duration-[180ms] hover:text-acid motion-reduce:transition-none" href="#about">{content.navStudioLabel}</a>
        </nav>
        <a className="text-[12px] text-[#c5c6bf] transition-colors duration-[180ms] hover:text-acid motion-reduce:transition-none max-[760px]:text-[11px]" href={`mailto:${content.contactEmail}`}>
          Let&apos;s talk <span className="ml-[6px] text-acid" aria-hidden="true">↗</span>
        </a>
      </header>

      <section
        className="relative grid h-[min(780px,calc(100svh-88px))] min-h-[min(660px,calc(100svh-88px))] grid-cols-[1.05fr_0.95fr] grid-rows-[1fr_auto] overflow-hidden px-[7.2%] pt-[90px] pb-7 max-[760px]:h-auto max-[760px]:min-h-[760px] max-[760px]:grid-cols-1 max-[760px]:grid-rows-[auto_1fr_auto] max-[760px]:px-[6%] max-[760px]:pt-[67px] max-[760px]:pb-[23px] max-[420px]:min-h-[720px] min-[1500px]:px-[max(7.2%,calc((100vw-1320px)/2))]"
        id="home"
        aria-labelledby="hero-title"
      >
        <div className="relative z-[2] self-center pb-[34px] max-[760px]:self-start max-[760px]:p-0">
          <p className="m-0 font-mono text-[10px] leading-[1.6] tracking-[0.11em] text-muted uppercase">
            <span className="mr-2 mb-px inline-block size-[6px] rounded-full bg-acid shadow-[0_0_12px_rgba(209,241,106,0.6)]" />
            {content.heroEyebrow}
          </p>
          <h1 className="mt-[27px] mb-[22px] text-[clamp(56px,7.6vw,108px)] font-medium leading-[0.98] tracking-[-0.085em] max-[760px]:mt-[22px] max-[760px]:mb-[18px] max-[760px]:text-[clamp(58px,12vw,82px)]">
            {content.heroTitleLine1}
            <br />
            {content.heroTitleLine2} <span className="font-normal text-acid italic tracking-[-0.09em]">{content.heroAccent}</span>
          </h1>
          <p className="m-0 max-w-[365px] text-[13px] leading-[1.85] text-[#a6a79f] max-[760px]:max-w-[330px] max-[760px]:text-[12px]">
            {content.heroDescription}
          </p>
          <a
            className="mt-[27px] inline-flex items-center gap-6 text-[11px] underline decoration-[rgba(242,240,233,0.4)] decoration-1 underline-offset-[8px] transition-colors duration-[180ms] hover:text-acid hover:decoration-acid motion-reduce:transition-none"
            href="#work"
          >
            {content.heroCta} <span className="text-acid" aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="absolute top-[4%] right-[3%] h-[84%] w-[57%] [perspective:1000px] max-[760px]:relative max-[760px]:top-auto max-[760px]:right-auto max-[760px]:row-[2] max-[760px]:mt-1 max-[760px]:h-[320px] max-[760px]:w-full" aria-hidden="true">
          <div className="absolute inset-[8%_4%_0_5%] rotate-x-[58deg] -rotate-z-[24deg] scale-[1.3] opacity-[0.24] [background-image:linear-gradient(rgba(242,240,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(242,240,233,0.08)_1px,transparent_1px)] [background-size:48px_48px] [-webkit-mask-image:radial-gradient(ellipse,#000_15%,transparent_70%)] [mask-image:radial-gradient(ellipse,#000_15%,transparent_70%)] max-[760px]:inset-[0_-5%_-2%] max-[760px]:[background-size:38px_38px]" />
          <div className="absolute top-[48%] left-[53%] aspect-square w-[clamp(240px,33vw,470px)] [transform:translate(-50%,-50%)_rotate(-24deg)_rotateY(-18deg)] rounded-[43%_57%_54%_46%/42%_43%_57%_58%] bg-[radial-gradient(ellipse_at_30%_23%,rgba(255,255,255,0.92)_0,rgba(244,255,187,0.8)_3%,transparent_12%),radial-gradient(ellipse_at_28%_25%,#d8f98c_0,#9ebc56_15%,#718b3f_32%,#435a31_52%,#263425_71%,#141914_83%)] shadow-[inset_-36px_-35px_60px_rgba(0,0,0,0.65),inset_18px_15px_24px_rgba(255,255,255,0.16),0_50px_85px_rgba(0,0,0,0.55)] animate-float motion-reduce:animate-none max-[760px]:w-[min(68vw,310px)] max-[760px]:left-1/2">
            <div className="absolute inset-[7%_15%_12%_7%] rotate-[33deg] rounded-[44%_56%_52%_48%/40%_45%_55%_60%] border border-[rgba(245,255,213,0.45)]" />
            <div className="absolute top-[29%] left-[-2%] h-[38%] w-[104%] rotate-[-28deg] rotate-x-[64deg] rounded-[50%] border border-[rgba(211,244,143,0.55)] shadow-[0_0_25px_rgba(209,241,106,0.12)]" />
            <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(130deg,transparent_36%,rgba(5,9,6,0.18)_37%,transparent_61%)]" />
            <div className="absolute top-[14%] left-[24%] h-[12%] w-[28%] rotate-[-30deg] rounded-[50%] bg-[rgba(255,255,255,0.28)] blur-[17px]" />
          </div>
          <div className="absolute top-[49%] left-[52%] h-[33%] w-[84%] rounded-[50%] border border-[rgba(216,249,140,0.43)] [transform:translate(-50%,-50%)_rotate(-34deg)_rotateX(66deg)]" />
          <div className="absolute top-[49%] left-[52%] h-[43%] w-[93%] rounded-[50%] border border-[rgba(242,240,233,0.18)] [transform:translate(-50%,-50%)_rotate(32deg)_rotateX(67deg)]" />
          <div className="absolute right-[8%] bottom-[7%] flex w-[140px] justify-between font-mono text-[8px] tracking-[0.08em] text-[#85887e] max-[760px]:right-[1%] max-[760px]:bottom-[2%]">
            <span>FIG. 01</span><span>FORM / FEEL</span>
          </div>
          <span className="absolute top-[23%] right-[20%] text-[19px] text-acid">✳</span>
          <span className="absolute bottom-[24%] left-[15%] text-[12px] text-[#aeb0a6]">✳</span>
        </div>

        <div className="col-span-full flex items-center gap-4 self-end font-mono text-[9px] tracking-[0.04em] text-[#8b8d84] uppercase max-[760px]:gap-[10px] max-[760px]:text-[8px]">
          <span>{content.heroScrollText}</span>
          <span className="h-px w-[50px] bg-acid max-[760px]:w-7" />
          <span className="ml-auto max-[420px]:max-w-[125px] max-[420px]:text-right">{content.heroFootnote}</span>
        </div>
      </section>

      <section className="overflow-hidden border-t border-line px-[7.2%] pt-[105px] pb-[110px] max-[760px]:px-[6%] max-[760px]:pt-[78px] max-[760px]:pb-[82px] min-[1500px]:px-[max(7.2%,calc((100vw-1320px)/2))]" id="work" aria-labelledby="work-title">
        <div className="mb-[45px] flex items-end justify-between max-[760px]:mb-[30px] max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-[15px]">
          <div>
            <p className="m-0 font-mono text-[10px] leading-[1.6] tracking-[0.11em] text-muted uppercase">{content.workEyebrow}</p>
            <h2 className="mt-3 mb-0 text-[clamp(38px,5.2vw,68px)] font-medium leading-none tracking-[-0.075em]">
              {content.workTitle} <span className="font-normal text-acid italic">{content.workAccent}</span>
            </h2>
          </div>
          <p className="m-0 mb-[3px] text-[11px] leading-[1.8] text-[#a4a59e] max-[760px]:text-[10px]">
            {content.workDescription.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>{index > 0 && <br />}{line}</span>
            ))}
          </p>
        </div>

        <div className="relative" aria-roledescription="carousel" aria-label="Selected projects">
          <div className="relative h-[clamp(360px,48vw,570px)] [perspective:1300px] [transform-style:preserve-3d] max-[760px]:h-[min(93vw,470px)] max-[760px]:min-h-[340px] max-[420px]:min-h-[310px]">
            {content.projects.length === 0 && (
              <p className="absolute inset-0 grid place-items-center font-mono text-xs uppercase tracking-[0.14em] text-[#92948c]">
                New work coming soon
              </p>
            )}
            {content.projects.map((project, index) => {
              const position = getPosition(index);
              const isActive = index === activeProjectIndex;
              const projectNumber = String(index + 1).padStart(2, "0");
              return (
                <article
                  className={`absolute top-0 left-1/2 flex h-full w-[min(62%,760px)] flex-col [transform-style:preserve-3d] [transition:transform_650ms_cubic-bezier(0.2,0.75,0.2,1),opacity_500ms_ease,filter_500ms_ease] [will-change:transform] motion-reduce:transition-none max-[760px]:w-[82%] max-[420px]:w-[86%] ${projectPositionClasses[position]}`}
                  key={project.id}
                  aria-hidden={!isActive}
                  aria-label={`${project.name}, ${project.category}`}
                >
                  <div className={`relative isolate flex min-h-0 flex-1 overflow-hidden bg-[#c6bdac] ${projectArtClasses[project.art as keyof typeof projectArtClasses]}`}>
                    <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.19),transparent_45%),linear-gradient(0deg,rgba(0,0,0,0.19),transparent_45%)]" />
                    <span className="absolute top-[21px] left-[22px] z-[3] font-mono text-[9px] tracking-[0.09em] text-[rgba(20,23,17,0.62)] uppercase max-[420px]:top-[15px] max-[420px]:left-[15px]">F—{projectNumber}</span>
                    <div className="absolute inset-0 grid place-items-center [perspective:800px]">
                      <div className="art-object relative z-[2] aspect-square w-[clamp(125px,17vw,220px)] [transform-style:preserve-3d] animate-art-float motion-reduce:animate-none max-[760px]:w-[clamp(130px,37vw,190px)]">
                        <span className="absolute inset-0 block border" />
                        <div className="art-object-detail absolute border" />
                      </div>
                      <div className="art-shadow absolute top-[72%] left-[28%] h-[8%] w-[44%] rotate-x-[70deg] rounded-[50%] bg-[rgba(20,23,17,0.42)] blur-[16px]" />
                      <div className="art-orbit absolute h-[18%] w-1/2 rounded-[50%] border border-[rgba(30,34,25,0.5)] [transform:rotate(-35deg)_rotateX(68deg)_translateZ(40px)]" />
                    </div>
                    <span className="absolute right-[22px] bottom-5 z-[3] font-mono text-[9px] tracking-[0.09em] text-[rgba(20,23,17,0.62)] uppercase max-[420px]:right-[15px] max-[420px]:bottom-[15px] max-[420px]:text-[7px]">{content.workArtCaption}</span>
                  </div>
                  <div className="flex items-center justify-between px-px pt-[17px]">
                    <div>
                      <h3 className="mt-0 mb-1 text-[14px] font-semibold tracking-[-0.03em]">{project.name}</h3>
                      <p className="m-0 font-mono text-[9px] text-[#92948c]">{project.category}</p>
                    </div>
                    <span className="font-mono text-[9px] text-[#92948c]">{projectNumber} / {String(content.projects.length).padStart(2, "0")}</span>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-[27px] flex w-[min(62%,760px)] items-center justify-between max-[760px]:mt-[22px] max-[760px]:w-full">
            <div className="flex items-center gap-3 font-mono text-[9px] text-[#93958d]" aria-label={`Project ${content.projects.length ? activeProjectIndex + 1 : 0} of ${content.projects.length}`}>
              <span className="text-acid">{String(content.projects.length ? activeProjectIndex + 1 : 0).padStart(2, "0")}</span>
              <span className="h-px w-[100px] bg-line">
                <span className="block h-full bg-acid transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${content.projects.length ? ((activeProjectIndex + 1) / content.projects.length) * 100 : 0}%` }} />
              </span>
              <span>{String(content.projects.length).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-2">
              <button disabled={content.projects.length < 2} className="grid size-[38px] cursor-pointer place-items-center rounded-full border border-line bg-transparent p-0 text-ink transition-[border-color,color,background-color] duration-[180ms] hover:border-acid hover:bg-acid hover:text-paper disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none" type="button" onClick={() => moveCarousel(-1)} aria-label="Previous project">
                <ArrowIcon direction="left" />
              </button>
              <button disabled={content.projects.length < 2} className="grid size-[38px] cursor-pointer place-items-center rounded-full border border-line bg-transparent p-0 text-ink transition-[border-color,color,background-color] duration-[180ms] hover:border-acid hover:bg-acid hover:text-paper disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none" type="button" onClick={() => moveCarousel(1)} aria-label="Next project">
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[#1a1c17] px-[7.2%] pt-[102px] pb-[112px] max-[760px]:px-[6%] max-[760px]:pt-[75px] max-[760px]:pb-[82px] min-[1500px]:px-[max(7.2%,calc((100vw-1320px)/2))]" id="about">
        <p className="m-0 font-mono text-[10px] leading-[1.6] tracking-[0.11em] text-muted uppercase">{content.studioEyebrow}</p>
        <p className="mt-[25px] mb-0 max-w-[900px] text-[clamp(32px,5.3vw,70px)] font-medium leading-[1.15] tracking-[-0.07em]">
          {content.studioTextLead} <span className="text-[#85877e]">{content.studioTextMuted}</span>
        </p>
        <a
          className="mt-[27px] inline-flex items-center gap-6 text-[11px] underline decoration-[rgba(242,240,233,0.4)] decoration-1 underline-offset-[8px] transition-colors duration-[180ms] hover:text-acid hover:decoration-acid motion-reduce:transition-none"
          href={`mailto:${content.contactEmail}`}
        >
          {content.studioCta} <span className="text-acid" aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="flex min-h-[92px] items-center justify-between px-[7.2%] py-5 font-mono text-[9px] tracking-[0.08em] text-[#92948c] max-[760px]:min-h-[86px] max-[760px]:gap-3 max-[760px]:px-[6%] max-[760px]:py-[18px] max-[760px]:text-[7px] min-[1500px]:px-[max(7.2%,calc((100vw-1320px)/2))]">
        <a className="inline-flex items-center gap-[11px] font-sans text-[13px] font-extrabold tracking-[0.16em] text-ink" href="#home">
          <span className="inline-flex h-6 w-[25px] items-center gap-0.5 [perspective:80px]" aria-hidden="true">
            <i className="block h-[18px] w-[7px] -skew-y-[28deg] -rotate-y-[25deg] bg-acid [box-shadow:2px_2px_0_rgba(209,241,106,0.2)]" />
            <i className="block h-[23px] w-[7px] skew-y-[28deg] rotate-y-[25deg] bg-acid [box-shadow:2px_2px_0_rgba(209,241,106,0.2)]" />
            <i className="block h-[14px] w-[7px] -skew-y-[28deg] -rotate-y-[25deg] bg-acid [box-shadow:2px_2px_0_rgba(209,241,106,0.2)]" />
          </span>
          <span>{content.brandName}</span>
        </a>
        <span className="max-[420px]:hidden">{content.footerCopyright}</span>
        <a href={`mailto:${content.contactEmail}`}>{content.contactEmail.toUpperCase()} <span className="text-acid" aria-hidden="true">↗</span></a>
      </footer>
    </main>
  );
}
