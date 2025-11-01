import React, { useState, useEffect, useRef } from "react";
import "./App.scss";

// Import images
import img1 from "./images/fd9b1018-4ff5-4fe9-a2b1-0e39b07d42a6.JPG";
import img2 from "./images/IMG_8465.JPG";
import img3 from "./images/IMG_9788.JPG";
import img4 from "./images/IMG_0792.JPG";
import img5 from "./images/IMG_8565.JPG";
import img6 from "./images/IMG_8567.JPG";
import img7 from "./images/IMG_8816.JPG";
import img8 from "./images/IMG_0833.jpg";
import img9 from "./images/IMG_9589.JPG";

function App() {
	const [activeScreen, setActiveScreen] = useState("welcome");
	const [unlockedLocks, setUnlockedLocks] = useState({});
	const [envelopeOpened, setEnvelopeOpened] = useState(false);
	const [currentSection, setCurrentSection] = useState(0);
	const [activeDot, setActiveDot] = useState(0);
	const storyScreenRef = useRef(null);

	// Mouse sparkle effect
	useEffect(() => {
		const handleMouseMove = (e) => {
			if (Math.random() > 0.95) {
				const sparkle = document.createElement("div");
				sparkle.style.position = "fixed";
				sparkle.style.left = e.clientX + "px";
				sparkle.style.top = e.clientY + "px";
				sparkle.style.width = "5px";
				sparkle.style.height = "5px";
				sparkle.style.background = "#FFD700";
				sparkle.style.borderRadius = "50%";
				sparkle.style.pointerEvents = "none";
				sparkle.style.animation = "sparkle 1s ease-out forwards";
				sparkle.style.zIndex = "9999";
				document.body.appendChild(sparkle);

				setTimeout(() => {
					sparkle.remove();
				}, 1000);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Intersection Observer for story sections
	useEffect(() => {
		if (activeScreen !== "story") return;

		const sections = document.querySelectorAll(".story-section");
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
						const sectionIndex = parseInt(entry.target.dataset.section);
						setActiveDot(sectionIndex);
					}
				});
			},
			{ threshold: 0.5 }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, [activeScreen]);

	// Wheel event handler for story screen
	useEffect(() => {
		if (activeScreen !== "story") return;

		const handleWheel = (e) => {
			e.preventDefault();
			const delta = e.deltaY;
			const sections = document.querySelectorAll(".story-section");

			if (delta > 0 && currentSection < sections.length - 1) {
				setCurrentSection(currentSection + 1);
				scrollToSection(currentSection + 1);
			} else if (delta < 0 && currentSection > 0) {
				setCurrentSection(currentSection - 1);
				scrollToSection(currentSection - 1);
			}
		};

		const storyScreen = storyScreenRef.current;
		if (storyScreen) {
			storyScreen.addEventListener("wheel", handleWheel);
			return () => storyScreen.removeEventListener("wheel", handleWheel);
		}
	}, [activeScreen, currentSection]);

	const startJourney = () => {
		setActiveScreen("puzzle");
	};

	const unlockStory = (lockNumber) => {
		// Count how many locks are already unlocked
		const unlockedCount = Object.keys(unlockedLocks).filter((key) => unlockedLocks[key]).length;

		// Only allow unlocking the next lock in sequence
		if (lockNumber !== unlockedCount + 1) {
			// Show a hint if trying to unlock out of order
			const hint = document.createElement("div");
			hint.style.position = "fixed";
			hint.style.top = "50%";
			hint.style.left = "50%";
			hint.style.transform = "translate(-50%, -50%)";
			hint.style.fontSize = "28px";
			hint.style.color = "#ffd700";
			hint.style.background = "rgba(0, 0, 0, 0.8)";
			hint.style.padding = "30px 50px";
			hint.style.borderRadius = "20px";
			hint.style.animation = "fadeIn 0.3s ease-out";
			hint.style.pointerEvents = "none";
			hint.style.zIndex = "1000";
			hint.style.textAlign = "center";
			hint.style.fontFamily = "'Cormorant Garamond', serif";
			hint.textContent = "💝 Unlock the memories in order, my love 💝";
			document.body.appendChild(hint);

			setTimeout(() => {
				hint.remove();
			}, 2000);
			return;
		}

		if (!unlockedLocks[lockNumber]) {
			setUnlockedLocks({ ...unlockedLocks, [lockNumber]: true });

			// Create multiple hearts celebration effect
			for (let i = 0; i < 15; i++) {
				setTimeout(() => {
					const heart = document.createElement("div");
					const randomX = Math.random() * window.innerWidth;
					const randomDelay = Math.random() * 0.5;
					const hearts = ["❤️", "💕", "💖", "💗", "💝", "💓"];
					const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];

					heart.style.position = "fixed";
					heart.style.left = randomX + "px";
					heart.style.top = "100%";
					heart.style.fontSize = "40px";
					heart.style.pointerEvents = "none";
					heart.style.zIndex = "1000";
					heart.style.animation = `floatUp 3s ease-out ${randomDelay}s forwards`;
					heart.textContent = randomHeart;
					document.body.appendChild(heart);

					setTimeout(() => {
						heart.remove();
					}, 3500);
				}, i * 100);
			}

			// Show success message
			const celebration = document.createElement("div");
			celebration.style.position = "fixed";
			celebration.style.top = "50%";
			celebration.style.left = "50%";
			celebration.style.transform = "translate(-50%, -50%)";
			celebration.style.fontSize = "48px";
			celebration.style.color = "#ffd700";
			celebration.style.background = "rgba(0, 0, 0, 0.8)";
			celebration.style.padding = "40px 60px";
			celebration.style.borderRadius = "30px";
			celebration.style.animation = "pulseIn 0.6s ease-out";
			celebration.style.pointerEvents = "none";
			celebration.style.zIndex = "1000";
			celebration.style.textAlign = "center";
			celebration.style.fontFamily = "'Great Vibes', cursive";
			celebration.style.border = "3px solid #ffd700";
			celebration.innerHTML = "✨ Memory Unlocked ✨";
			document.body.appendChild(celebration);

			setTimeout(() => {
				celebration.remove();
			}, 1500);
		}
	};

	const showEnvelope = () => {
		const unlockedCount = Object.keys(unlockedLocks).filter((key) => unlockedLocks[key]).length;

		if (unlockedCount < 6) {
			// Show message to unlock all locks first
			const message = document.createElement("div");
			message.style.position = "fixed";
			message.style.top = "50%";
			message.style.left = "50%";
			message.style.transform = "translate(-50%, -50%)";
			message.style.fontSize = "28px";
			message.style.color = "#ffd700";
			message.style.background = "rgba(0, 0, 0, 0.9)";
			message.style.padding = "40px 60px";
			message.style.borderRadius = "25px";
			message.style.animation = "fadeIn 0.3s ease-out";
			message.style.pointerEvents = "none";
			message.style.zIndex = "1000";
			message.style.textAlign = "center";
			message.style.fontFamily = "'Cormorant Garamond', serif";
			message.style.border = "3px solid #ffd700";
			message.innerHTML = `💝 Unlock all ${6 - unlockedCount} remaining memories first, my love 💝`;
			document.body.appendChild(message);

			setTimeout(() => {
				message.remove();
			}, 2500);
			return;
		}

		setActiveScreen("envelope");
	};

	const openEnvelope = () => {
		setEnvelopeOpened(true);
		setTimeout(() => {
			setActiveScreen("story");
		}, 2500);
	};

	const scrollToSection = (index) => {
		const sections = document.querySelectorAll(".story-section");
		if (sections[index]) {
			sections[index].scrollIntoView({ behavior: "smooth", block: "center" });
			setActiveDot(index);
		}
	};

	const showFinal = () => {
		setActiveScreen("final");
	};

	const restartJourney = () => {
		setActiveScreen("welcome");
		setUnlockedLocks({});
		setEnvelopeOpened(false);
		setCurrentSection(0);
		setActiveDot(0);
	};

	return (
		<div className="App">
			<div className="particles">
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
			</div>

			{/* Welcome Screen */}
			<div id="welcome-screen" className={`screen ${activeScreen === "welcome" ? "active" : ""}`}>
				<div className="welcome-content">
					<div className="birthday-number">25</div>
					<h1 className="welcome-title">Happy Birthday My Love</h1>
					<p className="welcome-subtitle">
						I've created something special for you...
						<br />A journey through our beautiful memories together ❤️
					</p>
					<button className="start-btn" onClick={startJourney}>
						<span>Begin Our Journey ✨</span>
					</button>
				</div>
			</div>

			{/* Puzzle Screen */}
			<div id="puzzle-screen" className={`screen ${activeScreen === "puzzle" ? "active" : ""}`}>
				<div className="puzzle-container">
					<h2 className="puzzle-title">Unlock Our Story</h2>
					<p className="puzzle-subtitle">Each lock holds a special moment. Click to unlock them one by one...</p>

					<div className="locks-grid">
						<div className={`lock-item ${unlockedLocks[1] ? "unlocked" : ""}`} data-lock="1" onClick={() => unlockStory(1)}>
							<span className="lock-icon">{unlockedLocks[1] ? "🔓" : "🔒"}</span>
							<div className="lock-title">The Beginning</div>
							<div className="lock-date">Dec 27, 2022</div>
						</div>
						<div className={`lock-item ${unlockedLocks[2] ? "unlocked" : ""}`} data-lock="2" onClick={() => unlockStory(2)}>
							<span className="lock-icon">{unlockedLocks[2] ? "🔓" : "🔒"}</span>
							<div className="lock-title">Our Dating Days</div>
							<div className="lock-date">2023</div>
						</div>
						<div className={`lock-item ${unlockedLocks[3] ? "unlocked" : ""}`} data-lock="3" onClick={() => unlockStory(3)}>
							<span className="lock-icon">{unlockedLocks[3] ? "🔓" : "🔒"}</span>
							<div className="lock-title">You Said Yes</div>
							<div className="lock-date">Jan 20, 2024</div>
						</div>
						<div className={`lock-item ${unlockedLocks[4] ? "unlocked" : ""}`} data-lock="4" onClick={() => unlockStory(4)}>
							<span className="lock-icon">{unlockedLocks[4] ? "🔓" : "🔒"}</span>
							<div className="lock-title">Our Home</div>
							<div className="lock-date">6 Months Together</div>
						</div>
						<div className={`lock-item ${unlockedLocks[5] ? "unlocked" : ""}`} data-lock="5" onClick={() => unlockStory(5)}>
							<span className="lock-icon">{unlockedLocks[5] ? "🔓" : "🔒"}</span>
							<div className="lock-title">The Distance</div>
							<div className="lock-date">Mysore Journey</div>
						</div>
						<div className={`lock-item ${unlockedLocks[6] ? "unlocked" : ""}`} data-lock="6" onClick={() => unlockStory(6)}>
							<span className="lock-icon">{unlockedLocks[6] ? "🔓" : "🔒"}</span>
							<div className="lock-title">Our Reunion</div>
							<div className="lock-date">Diwali 2024</div>
						</div>
					</div>

					<button className="unlock-all-btn" onClick={showEnvelope}>
						Continue to Your Letter 💌
					</button>
				</div>
			</div>

			{/* Envelope Screen */}
			<div id="envelope-screen" className={`screen ${activeScreen === "envelope" ? "active" : ""}`}>
				<p className="envelope-instruction">Click the envelope to open your special message ✨</p>
				<div className="envelope-container">
					<div className={`envelope ${envelopeOpened ? "opened" : ""}`} onClick={openEnvelope}>
						<div className="envelope-back"></div>
						<div className="envelope-flap"></div>
						<div className="envelope-seal">❤️</div>
						<div className="letter">
							<div className="letter-content">
								<div className="letter-title">To My Forever</div>
								<p>
									Click anywhere to read
									<br />
									our complete story...
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Story Screen */}
			<div id="story-screen" ref={storyScreenRef} className={`screen ${activeScreen === "story" ? "active" : ""}`}>
				<div className="story-nav">
					<div className={`nav-dot ${activeDot === 0 ? "active" : ""}`} onClick={() => scrollToSection(0)}></div>
					<div className={`nav-dot ${activeDot === 1 ? "active" : ""}`} onClick={() => scrollToSection(1)}></div>
					<div className={`nav-dot ${activeDot === 2 ? "active" : ""}`} onClick={() => scrollToSection(2)}></div>
					<div className={`nav-dot ${activeDot === 3 ? "active" : ""}`} onClick={() => scrollToSection(3)}></div>
					<div className={`nav-dot ${activeDot === 4 ? "active" : ""}`} onClick={() => scrollToSection(4)}></div>
					<div className={`nav-dot ${activeDot === 5 ? "active" : ""}`} onClick={() => scrollToSection(5)}></div>
					<div className={`nav-dot ${activeDot === 6 ? "active" : ""}`} onClick={() => scrollToSection(6)}></div>
				</div>

				<div className="story-section visible" data-section="0">
					<div className="story-content">
						<div className="story-text-box">
							<div className="story-date">📅 December 27, 2022</div>
							<p className="story-text">
								That day, <span className="story-highlight">destiny wrote the first line of our beautiful story.</span> We were strangers, yet the moment our eyes met, something magical happened.
							</p>
							<p className="story-text">
								I remember thinking — <span className="story-highlight">"This girl is different. This is special."</span>
							</p>
							<p className="story-text">Little did I know, you would become my everything — my habit, my necessity, and the permanent resident of my heart. ❤️</p>
						</div>
						<div className="story-image-box">
							<img src={img1} alt="When Our Story Began" className="story-image-photo" />
							<div className="story-caption">When Our Story Began ✨</div>
						</div>
					</div>
				</div>

				<div className="story-section" data-section="1">
					<div className="story-content reverse">
						<div className="story-text-box">
							<div className="story-date">💕 One Year of Dating</div>
							<p className="story-text">
								What followed was <span className="story-highlight">a year of the most beautiful chaos.</span> Cute jealousy, stupid fights, endless late-night calls, and dreams of our future together.
							</p>
							<p className="story-text">
								Every single day, I woke up thinking — <span className="story-highlight">"I'm so incredibly lucky that she chose me."</span>
							</p>
							<p className="story-text">You made ordinary days feel extraordinary. You became my favorite hello and my hardest goodbye. 💫</p>
						</div>
						<div className="story-image-box">
							<img src={img3} alt="Building Beautiful Memories" className="story-image-photo" />
							<div className="story-caption">Building Beautiful Memories 💑</div>
						</div>
					</div>
				</div>

				<div className="story-section" data-section="2">
					<div className="story-content">
						<div className="story-text-box">
							<div className="story-date">💍 January 20, 2024</div>
							<p className="story-text">
								The day you said yes — <span className="story-highlight">the universe aligned in our favor.</span> It felt like every star in the sky celebrated with me.
							</p>
							<p className="story-text">
								When you finally got convinced, I made a silent promise — <span className="story-highlight">to always make you feel loved, to always be your safe space, to always choose you.</span>
							</p>
							<p className="story-text">This wasn't just about being together; it was about knowing we both wanted this forever. 💖</p>
						</div>
						<div className="story-image-box">
							<img src={img5} alt="The Day You Said Yes" className="story-image-photo" />
							<div className="story-caption">The Day You Said Let's Go 💕</div>
						</div>
					</div>
				</div>

				<div className="story-section" data-section="3">
					<div className="story-contonent reverse">
						<div className="story-text-box">
							<div className="story-date">🏠 6 Months of Heaven</div>
							<p className="story-text">
								<span className="story-highlight">The most magical 6 months of my existence.</span> One roof, one bed, one life — two hearts beating as one.
							</p>
							<p className="story-text">Every morning began with your messy hair and sleepy smile. Every night ended feeling safe in your embrace.</p>
							<p className="story-text">
								<span className="story-highlight">You were my calm in chaos, my excitement in routine, my madness in sanity. You were — and still are — my home.</span> 🏡
							</p>
						</div>
						<div className="story-image-box">
							<img src={img6} alt="Our Little Paradise" className="story-image-photo" />
							<div className="story-caption">Our Little Paradise 💑</div>
						</div>
					</div>
				</div>

				<div className="story-section" data-section="4">
					<div className="story-content">
						<div className="story-text-box">
							<div className="story-date">✈️ Mysore - The Hardest Goodbye</div>
							<p className="story-text">
								Then came the chapter that tested us. At the airport, I held your hand <span className="story-highlight">tighter than I've ever held anything.</span>
							</p>
							<p className="story-text">
								Your eyes filled with tears mirrored mine. <span className="story-highlight">Watching you walk away felt like watching a part of my soul leave with you.</span>
							</p>
							<p className="story-text">Those two months felt like two years. Our house wasn't home anymore without you. 💔</p>
						</div>
						<div className="story-image-box">
							<img src={img8} alt="The Painful Goodbye" className="story-image-photo" />
							<div className="story-caption">The Painful Goodbye 😢</div>
						</div>
					</div>
				</div>

				<div className="story-section" data-section="5">
					<div className="story-content reverse">
						<div className="story-text-box">
							<div className="story-date">🪔 Diwali - Our Reunion</div>
							<p className="story-text">
								After two months that felt like eternity, <span className="story-highlight">Diwali brought you back to me.</span> Those 5 days were pure paradise.
							</p>
							<p className="story-text">We packed a lifetime into those days — infinite hugs, endless drives, uncontrollable laughter, and yes, even our adorable fights.</p>
							<p className="story-text">
								But then came the airport again. That holding-on hug. Those silent tears. <span className="story-highlight">A piece of me left with you once more.</span> ✨
							</p>
						</div>
						<div className="story-image-box">
							<img src={img9} alt="Five Days of Magic" className="story-image-photo" />
							<div className="story-caption">Five Days of Magic 🎆</div>
						</div>
					</div>
				</div>

				<div className="story-section" data-section="6">
					<div className="story-content">
						<div className="story-text-box">
							<div className="story-date">🎂 Today - Your 25th Birthday</div>
							<p className="story-text">
								<span className="story-highlight">I'm overwhelmed with gratitude.</span> Thank you for becoming my life, for making me feel every emotion deeply, for staying, understanding, and choosing me every day.
							</p>
							<p className="story-text">
								You're not just a chapter — <span className="story-highlight">you ARE my entire story.</span> You're my peace, my comfort, my future.
							</p>
							<p className="story-text" style={{ fontSize: "24px", color: "#ffd700", fontWeight: 700 }}>
								Come back to me soon. Life without you is incomplete. I miss you in every heartbeat. 💜
							</p>
							<button className="unlock-all-btn story-btn" onClick={showFinal}>
								See My Final Message 💌
							</button>
						</div>
						<div className="story-image-box">
							<img src={img7} alt="Forever & Always" className="story-image-photo" />
							<div className="story-caption">Forever & Always 💕</div>
						</div>
					</div>
				</div>
			</div>

			{/* Final Screen */}
			<div id="final-screen" className={`screen ${activeScreen === "final" ? "active" : ""}`}>
				<div className="final-content">
					<div className="final-heart">❤️</div>
					<h1 className="final-title">Happy Birthday, My Love</h1>
					<p className="final-message">
						<span className="story-highlight">I love you with every fiber of my being, with every breath I take, with every beat of my heart.</span>
					</p>
					<p className="final-message">
						A house is just walls and a roof. <span className="story-highlight">It only becomes home when you're in it.</span>
					</p>
					<p className="final-message" style={{ fontSize: "32px", color: "#ffd700", marginTop: "40px" }}>
						Come back soon, my Baccha 💜
					</p>
					<p className="final-signature">Forever Yours ♡</p>
					<button className="restart-btn" onClick={restartJourney}>
						Experience Again ✨
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
