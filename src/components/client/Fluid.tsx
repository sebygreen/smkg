"use client";

import fragment from "@/assets/shaders/fragment.glsl";
import vertex from "@/assets/shaders/vertex.glsl";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Mesh, ShaderMaterial } from "three";
import { useMemo, useRef } from "react";
import styles from "@/style/Fluid.module.css";
import { motion } from "framer-motion";

function Plane() {
    const mesh = useRef<Mesh>(null!);
    let time = 0;

    useFrame(() => {
        time += 0.5;
        (mesh.current.material as ShaderMaterial).uniforms.time.value = time / 10000;
    });

    const extensions = {
        clipCullDistance: false,
        multiDraw: false,
        derivatives: "#extension GL_OS_standard_derivatives : enable",
    };

    const uniforms = useMemo(() => {
        const palette = ["#954cda", "#eb1f29", "#7ccceb", "#ebb743"];
        const colors = palette.map((color) => new THREE.Color(color));
        return {
            time: { value: 0 },
            uColor: { value: colors },
            resolution: { value: new THREE.Vector4() },
        };
    }, []);

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[1, 1, 300, 300]} />
            <shaderMaterial
                extensions={extensions}
                side={THREE.DoubleSide}
                uniforms={uniforms}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </mesh>
    );
}

export default function Fluid() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className={styles.canvas}
        >
            <Canvas
                camera={{
                    fov: 20,
                    near: 0.1,
                    far: 100,
                    position: [0, -3, 2],
                    zoom: 3.5,
                }}
            >
                <ambientLight color={0xffffff} intensity={0.5} />
                <directionalLight color={0xffffff} intensity={0.5} />
                <Plane />
            </Canvas>
        </motion.div>
    );
}
