import React, { useRef, useState } from 'react';
import type { UIEvent } from 'react'; 
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import type { IParallax } from '@react-spring/parallax';
import './Firewatch.css';

interface FirewatchParallaxProps {
    onComplete: () => void;
}

export default function FirewatchParallax({ onComplete }: FirewatchParallaxProps) {
    const parallaxRef = useRef<IParallax>(null);
    const [isFading, setIsFading] = useState<boolean>(false);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const bottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < 2;

        if (bottom && !isFading) {
            setIsFading(true);
            setTimeout(() => {
                onComplete();
            }, 1000);
        }
    };

    return (
        <div className={`parallax-container ${isFading ? 'fade-out' : ''}`}>
            <Parallax
                pages={2.5}
                ref={parallaxRef}
                style={{ top: '0', left: '0' }}
                onScroll={handleScroll}
            >

                {/* CAPA 0: El Cielo */}
                <ParallaxLayer offset={0} speed={0.1}>
                    <div className="sky-gradient" />
                </ParallaxLayer>

                {/* CAPA 1: Montañas Lejanas (Vector SVG) */}
                <ParallaxLayer offset={0.3} speed={0.3} className="layer-vector">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="svg-layer color-back">
                        <path d="M0,160 L120,130 C240,100,480,40,720,70 C960,100,1200,220,1320,280 L1440,320 L1440,320 L1320,320 C1200,320,960,320,720,320 C480,320,240,320,120,320 L0,320 Z"></path>
                    </svg>
                </ParallaxLayer>

                {/* CAPA 2: Montañas Medias (Vector SVG) */}
                <ParallaxLayer offset={0.5} speed={0.6} className="layer-vector">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="svg-layer color-mid">
                        <path d="M0,220 L160,180 C320,140,640,60,960,110 C1280,160,1360,260,1400,290 L1440,320 L1440,320 L0,320 Z"></path>
                    </svg>
                </ParallaxLayer>

                {/* CAPA 3: El Bosque de Pinos del Frente (Vector SVG) */}
                <ParallaxLayer offset={0.8} speed={0.9} className="layer-vector">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="svg-layer color-front">
                        {/* Siluetas de árboles vectoriales */}
                        <path d="M0,280 L40,240 L50,250 L90,210 L100,220 L150,170 L170,195 L220,140 L240,165 L300,110 L340,150 L400,90 L450,140 L520,70 L580,130 L650,60 L720,120 L800,50 L880,130 L950,70 L1020,120 L1100,60 L1180,130 L1260,70 L1350,140 L1440,50 L1440,320 L0,320 Z"></path>
                    </svg>
                </ParallaxLayer>

                {/* CAPA TÍTULO: Abajo en el bosque */}
                <ParallaxLayer
                    offset={1.6}
                    speed={1.2}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <div className="title-container">
                        <h1 className="firewatch-title">MI AVENTURA</h1>
                        <p className="scroll-sub">Sigue bajando para entrar...</p>
                    </div>
                </ParallaxLayer>

            </Parallax>
        </div>
    );
}