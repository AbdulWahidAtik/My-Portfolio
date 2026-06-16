import React, { useEffect, useRef, useState } from "react";
import profilePhoto from "./Photo/Profile.png";

const roles = [
  "MERN Stack Developer",
  "React.js Frontend Builder",
  "Node.js API Developer",
  "Responsive Web Application Developer",
];

const skills = [
  ["MongoDB", "https://cdn.simpleicons.org/mongodb/47A248"],
  ["Express.js", "https://cdn.simpleicons.org/express/ffffff"],
  ["React", "https://cdn.simpleicons.org/react/61DAFB"],
  ["Node.js", "https://cdn.simpleicons.org/nodedotjs/5FA04E"],
  ["Tailwind", "https://cdn.simpleicons.org/tailwindcss/06B6D4"],
  ["Firebase", "https://cdn.simpleicons.org/firebase/FFCA28"],
  ["JavaScript", "https://cdn.simpleicons.org/javascript/F7DF1E"],
  ["GitHub", "https://cdn.simpleicons.org/github/ffffff"],
  ["HTML", "https://cdn.simpleicons.org/html5/E34F26"],
  ["CSS", "https://cdn.simpleicons.org/css/1572B6"],
  ["Vite", "https://cdn.simpleicons.org/vite/646CFF"],
  ["Git", "https://cdn.simpleicons.org/git/F05032"],
  ["PostgreSQL", "https://cdn.simpleicons.org/postgresql/4169E1"],
  ["MySQL", "https://cdn.simpleicons.org/mysql/4479A1"],
  ["Figma", "https://cdn.simpleicons.org/figma/F24E1E"],
];

const projects = [
  {
    type: "AI Tool",
    title: "AI Resume Builder",
    mark: "AI",
    desc: "Smart resume building system with AI-generated summaries, skill suggestions, live customization, and professional PDF export.",
    tags: ["AI", "Resume Builder", "PDF Export"],
    liveUrl: "https://ai-resume-maker-nine-ashen.vercel.app/",
  },
  {
    type: "Ecommerce",
    title: "Gromuse Fresh Market",
    mark: "GM",
    desc: "Full-stack grocery ecommerce project with a customer storefront, cart and checkout flow, customer accounts, admin product management, and admin order management.",
    tags: ["React", "Vite", "Express", "MongoDB"],
    liveUrl: "https://gromuse-store.vercel.app/",
  },
  {
    type: "Travel App",
    title: "Travel Guru Booking App",
    mark: "TG",
    desc: "Travel web application with destination-based trip planning, secure authentication, and real-time booking management using Firebase.",
    tags: ["Firebase", "Auth", "Booking"],
    liveUrl: "https://travel-bda68.web.app/",
  },
  {
    type: "Portfolio",
    title: "Personal Portfolio Website",
    mark: "MW",
    desc: "Responsive developer portfolio showcasing full-stack projects, services, technical skills, and contact information in a modern single-page experience.",
    tags: ["Responsive", "Portfolio", "Frontend"],
    liveUrl: "#hero",
  },
];

function useTypedText() {
  const [text, setText] = useState("");

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const loop = () => {
      const current = roles[roleIndex];
      setText(current.slice(0, charIndex));

      if (!deleting && charIndex < current.length) {
        charIndex += 1;
      } else if (!deleting) {
        deleting = true;
        timer = window.setTimeout(loop, 1200);
        return;
      } else if (charIndex > 0) {
        charIndex -= 1;
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      timer = window.setTimeout(loop, deleting ? 36 : 58);
    };

    loop();
    return () => window.clearTimeout(timer);
  }, []);

  return text;
}

function MatrixCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let frameId;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const particleCount = Math.min(150, Math.max(100, Math.floor(window.innerWidth / 12)));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * window.innerWidth - window.innerWidth / 2,
        y: Math.random() * window.innerHeight - window.innerHeight / 2,
        z: (Math.random() - 0.5) * 460,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        vz: (Math.random() - 0.5) * 0.12,
        radius: 1.15 + Math.random() * 1.45,
        opacity: 0.34 + Math.random() * 0.5,
      }));
    };

    const updatePointerRotation = (event) => {
      const xProgress = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      const yProgress = event.clientY / Math.max(1, window.innerHeight) - 0.5;
      targetRotateY = xProgress * 0.58;
      targetRotateX = -yProgress * 0.36;
    };

    const resetPointerRotation = () => {
      targetRotateX = 0;
      targetRotateY = 0;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      const isLightMode = document.body.classList.contains("light");

      if (isLightMode) {
        gradient.addColorStop(0, "#f4ecde");
        gradient.addColorStop(0.52, "#fbf4e9");
        gradient.addColorStop(1, "#efe4d2");
      } else {
        gradient.addColorStop(0, "#020308");
        gradient.addColorStop(0.52, "#050816");
        gradient.addColorStop(1, "#07101f");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      const time = Date.now() * 0.00016;
      currentRotateX += (targetRotateX - currentRotateX) * 0.07;
      currentRotateY += (targetRotateY - currentRotateY) * 0.07;
      const rotateX = currentRotateX + Math.sin(time * 0.74) * 0.05;
      const rotateY = currentRotateY + Math.cos(time) * 0.06;
      const cosX = Math.cos(rotateX);
      const sinX = Math.sin(rotateX);
      const cosY = Math.cos(rotateY);
      const sinY = Math.sin(rotateY);
      const cameraDistance = Math.max(width, height) * 1.2;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        if (particle.x <= -width / 2 || particle.x >= width / 2) particle.vx *= -1;
        if (particle.y <= -height / 2 || particle.y >= height / 2) particle.vy *= -1;
        if (particle.z <= -260 || particle.z >= 260) particle.vz *= -1;
      });

      const project = (particle) => {
        const rotatedX = particle.x * cosY - particle.z * sinY;
        const rotatedZ = particle.x * sinY + particle.z * cosY;
        const rotatedY = particle.y * cosX - rotatedZ * sinX;
        const finalZ = particle.y * sinX + rotatedZ * cosX;
        const perspective = cameraDistance / (cameraDistance + finalZ);

        return {
          x: width / 2 + rotatedX * perspective,
          y: height / 2 + rotatedY * perspective,
          size: particle.radius * perspective,
          opacity: particle.opacity * Math.max(0.38, Math.min(1, perspective)),
        };
      };

      for (let i = 0; i < particles.length; i += 1) {
        const aProjected = project(particles[i]);
        for (let j = i + 1; j < particles.length; j += 1) {
          const bProjected = project(particles[j]);
          const dx = aProjected.x - bProjected.x;
          const dy = aProjected.y - bProjected.y;
          const distance = Math.hypot(dx, dy);
          const maxDistance = 145;

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * (isLightMode ? 0.11 : 0.16);
            ctx.strokeStyle = isLightMode
              ? `rgba(47, 95, 174, ${alpha})`
              : `rgba(79, 180, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(aProjected.x, aProjected.y);
            ctx.lineTo(bProjected.x, bProjected.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        const projected = project(particle);
        ctx.globalAlpha = projected.opacity * (isLightMode ? 0.76 : 1);
        ctx.fillStyle = isLightMode ? "#2f5fae" : "#66b7ff";
        ctx.shadowColor = isLightMode ? "rgba(47, 95, 174, .35)" : "rgba(0, 212, 255, .75)";
        ctx.shadowBlur = isLightMode ? 5 : 9;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, Math.max(0.8, projected.size), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointerRotation, { passive: true });
    window.addEventListener("pointerleave", resetPointerRotation);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointerRotation);
      window.removeEventListener("pointerleave", resetPointerRotation);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas id="matrix" ref={canvasRef} aria-hidden="true" />;
}

function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const scramblingRef = useRef(false);

  const runScramble = () => {
    const symbols = "@#%&0X$!?";
    const duration = 760;
    const startedAt = Date.now();
    const spread = 7;

    if (scramblingRef.current) return;
    scramblingRef.current = true;
    window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - startedAt) / duration);
      const wave = progress * (text.length + spread);

      const nextText = text
        .split("")
        .map((character, index) => {
          if (character === " ") return character;
          const distance = wave - index;
          const shouldScramble = distance >= 0 && distance < spread && Math.random() > 0.22;
          return shouldScramble ? symbols[Math.floor(Math.random() * symbols.length)] : character;
        })
        .join("");

      setDisplayText(nextText);

      if (progress >= 1) {
        window.clearInterval(intervalRef.current);
        setDisplayText(text);
        scramblingRef.current = false;
      }
    }, 45);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayText(text);
      return undefined;
    }

    const scheduleScramble = () => {
      timeoutRef.current = window.setTimeout(() => {
        runScramble();
        scheduleScramble();
      }, 2000 + Math.random() * 2000);
    };

    scheduleScramble();

    return () => {
      window.clearTimeout(timeoutRef.current);
      window.clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span className="scramble-text" aria-hidden="true" onPointerEnter={runScramble}>
      {displayText}
    </span>
  );
}

function SectionHeader({ eyebrow, title, lead }) {
  return (
    <>
      <div className="eyebrow reveal">{eyebrow}</div>
      <h2 className="reveal" aria-label={title}><ScrambleText text={title} /></h2>
      {lead ? <p className="section-lead reveal">{lead}</p> : null}
    </>
  );
}

function CountNumber({ value, duration = 1100 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numberRef = useRef(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId;

    const animate = () => {
      if (prefersReducedMotion) {
        setDisplayValue(value);
        return;
      }

      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(value * eased));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        } else {
          setDisplayValue(value);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.cancelAnimationFrame(frameId);
            setDisplayValue(0);
            animate();
          }
        });
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [value, duration]);

  return <span ref={numberRef}>{displayValue}</span>;
}

function App() {
  const typedText = useTypedText();
  const [terminalCommand, setTerminalCommand] = useState("");
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light", light);
  }, [light]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const commands = [
      "cat languages.md",
      "npm run build",
      "git status --short",
    ];
    let commandIndex = 0;
    let charIndex = 0;
    let hiding = false;
    let timeoutId;

    const tick = () => {
      const command = commands[commandIndex];
      setTerminalCommand(command.slice(0, charIndex));

      if (!hiding && charIndex < command.length) {
        charIndex += 1;
        timeoutId = window.setTimeout(tick, 62);
        return;
      }

      if (!hiding) {
        hiding = true;
        timeoutId = window.setTimeout(tick, 1450);
        return;
      }

      if (charIndex > 0) {
        charIndex -= 1;
        timeoutId = window.setTimeout(tick, 28);
        return;
      }

      hiding = false;
      commandIndex = (commandIndex + 1) % commands.length;
      timeoutId = window.setTimeout(tick, 360);
    };

    tick();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      frameId = window.requestAnimationFrame(animateRing);
    };

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    window.addEventListener("pointermove", moveCursor, { passive: true });
    animateRing();

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      <nav className={scrolled ? "scrolled" : ""}>
        <a className="logo" href="#hero">wahid.dev</a>
        <ul className="nav-links">
          <li><a href="#skills">Skills</a></li>
          <li><a href="#about">Profile</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#experience">Work</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button className="theme-btn icon-btn" type="button" aria-label="Toggle theme" onClick={() => setLight((value) => !value)}>*</button></li>
        </ul>
      </nav>
      <a className={scrolled ? "scroll-top visible" : "scroll-top"} href="#hero" aria-label="Scroll to top">↑</a>

      <main>
        <section id="hero">
          <MatrixCanvas />
          <div className="noise" />
          <div className="hero-content">
            <div className="status reveal"><span /> Available for MERN stack opportunities - Dhaka, Bangladesh</div>
            <h1 className="hero-title reveal">
              <span>Mohammed</span>
              <em>Abdul Wahid</em>
            </h1>
            <p className="role reveal"><span>{typedText}</span><span className="cursor" /></p>
            <div className="actions reveal">
              <a className="btn cta-link" href="mailto:wahidabdul50084@gmail.com" aria-label="Email Mohammed Abdul Wahid">
                <span className="cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>
                </span>
                email
              </a>
              <a className="btn cta-link" href="https://github.com/AbdulWahidAtik" target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
                <span className="cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.2 19c.5.1.7-.2.7-.5v-1.9c-2.7.6-3.3-1.1-3.3-1.1-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.5.7.1-.6.3-1 .5-1.2-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.3 4.6-4.5 4.8.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2z" /></svg>
                </span>
                github
              </a>
              <a className="btn cta-link" href="https://www.linkedin.com/in/abdul-wahid-2104b6278/" target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
                <span className="cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M6.5 9.5V19" /><path d="M10.5 19v-9.5" /><path d="M10.5 13.3c0-2.3 4-2.7 4 0V19" /><path d="M6.5 6.3h.01" /><path d="M4 3h16v18H4z" /></svg>
                </span>
                linkedin
              </a>
              <a className="btn cta-link" href="/CV%20final%202.pdf" download aria-label="Download resume">
                <span className="cta-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 4v12" /><path d="m8 12 4 4 4-4" /><path d="M5 20h14" /></svg>
                </span>
                resume
              </a>
            </div>
          </div>

          <div className="hero-profile reveal">
            <div
              className="profile-frame"
              onMouseMove={(event) => {
                const card = event.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const maxTilt = 12;
                const rotateY = ((x - centerX) / centerX) * maxTilt;
                const rotateX = -((y - centerY) / centerY) * maxTilt;

                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
              }}
            >
              <img src={profilePhoto} alt="Mohammed Abdul Wahid" className="profile-img" />
            </div>
          </div>

          <div className="hero-code reveal">
            <span>// mern stack profile</span><br />
            <b>WahidPortfolio</b> v1.0<br />
            react_vite_enabled<br />
            api_focus: <em>REST</em><br />
            stack: <em>MERN</em>
          </div>
        </section>

        <section id="about" className="section alt about-section">
          <div className="eyebrow reveal">profile.json</div>
          <h2 className="about-title reveal" aria-label="Who builds this stack.">
            <ScrambleText text="Who builds this stack." />
          </h2>

          <div className="about-grid">
            <div className="about-text reveal">
              <p>I'm a <strong>MERN Stack Developer</strong> with a BSc in Computer Science and Engineering from Daffodil International University, focused on building responsive and practical web applications.</p>
              <p>I work with <span>MongoDB, Express.js, React.js, and Node.js</span> to create clean, scalable, and user-friendly solutions. I enjoy solving problems, writing maintainable code, and turning project ideas into polished web experiences.</p>
              <p>My hands-on strengths include <strong>REST API integration, debugging, performance optimization, Firebase authentication, and responsive frontend development</strong> for real client and product needs.</p>
            </div>

            <div className="terminal about-terminal reveal">
              <div className="terminal-bar"><span className="dot" /><span className="dot" /><span className="dot" /></div>
              <div className="terminal-body">
                <span className="prompt">$</span> cat wahid-profile.json<br />
                {"{"}<br />
                &nbsp;&nbsp;<span className="key">"name"</span>: <span className="value">"Mohammed Abdul Wahid"</span>,<br />
                &nbsp;&nbsp;<span className="key">"role"</span>: <span className="value">"MERN Stack Developer"</span>,<br />
                &nbsp;&nbsp;<span className="key">"tools"</span>: <span className="value">["React", "Node", "Express", "MongoDB"]</span>,<br />
                &nbsp;&nbsp;<span className="key">"strengths"</span>: <span className="value">["debugging", "REST APIs", "performance"]</span><br />
                {"}"}
                <br /><br />
                <span className="prompt">$</span> run achievements<br />
                <span className="value">responsive_apps:</span> MERN stack technologies<br />
                <span className="value">optimization:</span> performance + user experience<br />
                <span className="key">backend:</span> REST APIs integrated efficiently<br />
                <span className="prompt">$</span> <span className="terminal-reveal-text">{terminalCommand}</span><span className="cursor"></span>
              </div>
            </div>
          </div>

          <div className="stats about-stats">
            <div className="stat reveal"><strong className="stat-number"><CountNumber value={4} /></strong><span><b>Projects shipped</b>full-stack and frontend builds</span></div>
            <div className="stat reveal"><strong className="stat-number"><CountNumber value={1} />+</strong><span><b>Professional role</b>SEO and web optimization</span></div>
            <div className="stat reveal"><strong className="stat-number"><CountNumber value={15} />+</strong><span><b>Tools used</b>modern web development stack</span></div>
            <div className="stat reveal"><strong className="stat-number">MERN</strong><span><b>Core stack</b>MongoDB, Express, React, Node</span></div>
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeader
            eyebrow="tech_stack.config"
            title="Skills and tools I work with."
          />
          <div className="skills-marquee reveal">
            {[skills.slice(0, 8), skills.slice(8)].map((row, rowIndex) => (
              <div className="marquee-row" data-direction={rowIndex % 2 === 0 ? "left" : "right"} key={rowIndex}>
                <div className="marquee-track">
                  {[...row, ...row, ...row].map(([title, iconUrl], index) => (
                    <div className="skill logo-tile" key={`${title}-${index}`}>
                      <div className="skill-icon">
                        <img src={iconUrl} alt={`${title} logo`} />
                      </div>
                      <h3>{title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section alt">
          <SectionHeader eyebrow="projects.ls" title="Featured projects I've built." />
          <div className="projects-grid">
            {projects.map((project) => {
              const CardTag = project.liveUrl ? "a" : "article";
              const external = project.liveUrl && !project.liveUrl.startsWith("#");

              return (
                <CardTag
                  className="project reveal"
                  href={project.liveUrl || undefined}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  key={project.title}
                >
                  <div className="project-visual" aria-hidden="true">
                    <div className="project-code">
                      const project = "{project.title}"<br />
                      deploy.status = "live"<br />
                      stack.render()
                    </div>
                    <span className="project-mark">{project.mark}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-top"><span>{project.type}</span><span className="project-arrow">&gt;</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="tags">
                      {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </CardTag>
              );
            })}
          </div>
        </section>

        <section id="experience" className="section timeline-section">
          <SectionHeader eyebrow="experience.log" title="Work experience." />
          <div className="timeline">
            <div className="timeline-row reveal">
              <div className="date">10/2023 - 10/2024</div>
              <div className="timeline-marker"><span /></div>
              <div className="timeline-content">
                <h3>SEO Specialist</h3>
                <div className="org">EnfIT - Contract, Remote</div>
                <p>Managed website content and SEO optimization, worked with online tools and data handling, and developed communication, teamwork, and problem-solving skills.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="section alt timeline-section">
          <SectionHeader eyebrow="education_timeline.log" title="Education timeline." />
          <div className="timeline">
            <div className="timeline-row reveal">
              <div className="date">2022 - Present</div>
              <div className="timeline-marker"><span /></div>
              <div className="timeline-content">
                <h3>BSc in Computer Science and Engineering</h3>
                <div className="org">Daffodil International University</div>
                <p>Relevant coursework includes Data Structures, Algorithms, and Software Engineering.</p>
              </div>
            </div>
            <div className="timeline-row reveal">
              <div className="date">2018 - 2020</div>
              <div className="timeline-marker"><span /></div>
              <div className="timeline-content">
                <h3>Higher Secondary School Certificate</h3>
                <div className="org">Hajera Taju Degree College, Chattagram - Science</div>
                <p>Completed higher secondary education in the science group with strong academic performance.</p>
              </div>
            </div>
            <div className="timeline-row reveal">
              <div className="date">2016 - 2018</div>
              <div className="timeline-marker"><span /></div>
              <div className="timeline-content">
                <h3>Secondary School Certificate</h3>
                <div className="org">Mirza Ahmed Ispahani Smriti Biddalaya, Chattagram - Science</div>
                <p>Completed secondary education in the science group, building the foundation for computer science study.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="certifications" className="section">
          <SectionHeader eyebrow="certifications.md" title="Certifications." />
          <div className="refs cert-grid">
            <article className="ref cert-card reveal">
              <div className="project-top"><span>Certificate</span><span>01</span></div>
              <h3>Professional Certification</h3>
              <p>Verified certificate document added from the provided PDF file.</p>
              <a className="btn cert-btn" href="/certificates/Certificate.pdf" target="_blank" rel="noreferrer">View certificate</a>
            </article>
            <article className="ref cert-card reveal">
              <div className="project-top"><span>Certificate</span><span>02</span></div>
              <h3>Professional Certification</h3>
              <p>Verified certificate document added from the provided PDF file.</p>
              <a className="btn cert-btn" href="/certificates/Certificate2.pdf" target="_blank" rel="noreferrer">View certificate</a>
            </article>
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="eyebrow reveal">contact.init()</div>
          <h2 className="contact-title reveal">Let's connect for <span>work</span></h2>
          <form className="contact-form reveal" action="mailto:wahidabdul50084@gmail.com" method="post" encType="text/plain">
            <input type="email" name="email" placeholder="Email" aria-label="Email" required />
            <input type="text" name="subject" placeholder="Subject" aria-label="Subject" required />
            <input type="text" name="message" placeholder="Message" aria-label="Message" required />
            <button className="send-btn" type="submit">Send</button>
          </form>
          <div className="contact-links reveal">
            <a className="btn cta-link" href="mailto:wahidabdul50084@gmail.com" aria-label="Email Mohammed Abdul Wahid">
              <span className="cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>
              </span>
              email
            </a>
            <a className="btn cta-link" href="tel:+8801537437213" aria-label="Call Mohammed Abdul Wahid">
              <span className="cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z" /></svg>
              </span>
              phone
            </a>
            <a className="btn cta-link" href="https://github.com/AbdulWahidAtik" target="_blank" rel="noreferrer" aria-label="Open GitHub profile">
              <span className="cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.2 19c.5.1.7-.2.7-.5v-1.9c-2.7.6-3.3-1.1-3.3-1.1-.4-1-.9-1.3-.9-1.3-.8-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.8 1.3 2 1 2.5.7.1-.6.3-1 .5-1.2-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.3 4.6-4.5 4.8.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2z" /></svg>
              </span>
              github
            </a>
            <a className="btn cta-link" href="/CV%20final%202.pdf" download aria-label="Download resume">
              <span className="cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 4v12" /><path d="m8 12 4 4 4-4" /><path d="M5 20h14" /></svg>
              </span>
              resume
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>&copy; 2026 Mohammed Abdul Wahid - MERN stack portfolio.</span>
      </footer>
    </>
  );
}

export default App;
