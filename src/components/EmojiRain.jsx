import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";


const EmojiRain = () => {
    const mouseDistance = 80;
    const emojiWaitTime = 50;
    const emojiFallDelay = 90;
    const emojiRotations = [90, -90];
    const emojiSizes = [150, 200, 250, 300];
    const totalEmojiVariants = 5;

    const [lastMouse, setLastMouse] = useState({ x: 0, y: 0, time: 0 });
    const emojiContainerRef = useRef(null);

    const createEmoji = (mouseX, mouseY) => {
        const size = emojiSizes[Math.floor(Math.random() * emojiSizes.length)];
        const variant = Math.floor(Math.random() * totalEmojiVariants + 1);

        const emoji = document.createElement("div");
        emoji.className = "emoji";
        emoji.style.width = `${size}px`;
        emoji.style.height = `${size}px`;
        emoji.style.backgroundImage = `url(/img${variant}.webp)`;
        emoji.style.left = `${mouseX - size / 2}px`;
        emoji.style.top = `${mouseY - size / 2}px`;

        const container = emojiContainerRef.current;
        if (!container) return;
        container.appendChild(emoji);

        const initialRotation = emojiRotations[Math.floor(Math.random() * emojiRotations.length)];
        const currentTime = Date.now();
        const delayFromLast = Math.max(0, emojiFallDelay - (currentTime - lastMouse.time)) / 1000;

        gsap.set(emoji, {
            scale: 0,
            rotate: initialRotation,
        });
        gsap.timeline()
            .to(emoji, {
                scale: 1,
                rotate: 0,
                duration: 0.5,
                ease: "back.out(1.75)",
            })
            .to(emoji, {
                y: window.innerHeight + size,
                rotation: initialRotation,
                duration: 0.5,
                ease: "power2.in",
                delay: emojiWaitTime / 1000 + delayFromLast,
                onComplete: () => emoji.remove(),
            });

        return currentTime;
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            const distance = Math.sqrt(
                Math.pow(e.clientX - lastMouse.x, 2) + Math.pow(e.clientY - lastMouse.y, 2)
            );

            if (distance > mouseDistance) {
                const currentTime = createEmoji(e.clientX, e.clientY);
                setLastMouse({ x: e.clientX, y: e.clientY, time: currentTime });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, [lastMouse]);

    return <div ref={emojiContainerRef} className="emojis"></div>;
};

export default EmojiRain;
