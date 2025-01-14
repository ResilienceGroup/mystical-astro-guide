import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AstralBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const planet1Texture = textureLoader.load('/lovable-uploads/f5cb438d-71c3-4e83-a37b-5b0256c3a2dd.png');
    const planet2Texture = textureLoader.load('/lovable-uploads/dc7bcc5d-2251-451b-ac9e-accf5b173dda.png');
    const planet3Texture = textureLoader.load('/lovable-uploads/f6bb9f8d-d7dd-4020-ad00-95f1c065c32a.png');

    // Create planets
    const createPlanet = (texture: THREE.Texture, size: number, position: THREE.Vector3) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.7
      });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.copy(position);
      return planet;
    };

    // Add planets to scene
    const planet1 = createPlanet(planet1Texture, 2, new THREE.Vector3(-5, 3, -10));
    const planet2 = createPlanet(planet2Texture, 1.5, new THREE.Vector3(5, -2, -8));
    const planet3 = createPlanet(planet3Texture, 1, new THREE.Vector3(0, 4, -6));

    scene.add(planet1, planet2, planet3);

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate planets
      planet1.rotation.y += 0.001;
      planet2.rotation.y += 0.002;
      planet3.rotation.y += 0.003;

      // Floating animation
      planet1.position.y = 3 + Math.sin(Date.now() * 0.001) * 0.2;
      planet2.position.y = -2 + Math.sin(Date.now() * 0.0015) * 0.15;
      planet3.position.y = 4 + Math.sin(Date.now() * 0.002) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};