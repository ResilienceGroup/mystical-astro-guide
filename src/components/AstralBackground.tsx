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

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      map: new THREE.TextureLoader().load(
        "data:image/png;base64," + 
        "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF" +
        "yWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0w" +
        "TXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRh" +
        "LyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8v" +
        "d3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9u" +
        "IHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv" +
        "IgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4" +
        "bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZl" +
        "bnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAg" +
        "eG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIj4KICAg" +
        "PHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1w" +
        "OkNyZWF0b3JUb29sPgogICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMS0xMlQxMjoyNDozOC0wNjow" +
        "MDwveG1wOkNyZWF0ZURhdGU+CiAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDEtMTJUMTI6MjQ6" +
        "MzgtMDY6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAxLTEy" +
        "VDEyOjI0OjM4LTA2OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1w" +
        "LmlpZDpkNDFlNzk2MS05ZGUxLTQ5ODEtYTJhNC1hZjg5NmNiYjg2NDM8L3htcE1NOkluc3RhbmNl" +
        "SUQ+CiAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyYzNhYzMzYy1i" +
        "OWI5LTExNzgtOWE5Yy1kOGI1ZDNiYTM1NzE8L3htcE1NOkRvY3VtZW50SUQ+CiAgIDx4bXBNTTpP" +
        "cmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo2YjI0ZTI3YS1jZjA3LTQ5ZDEtOWIwZC02ODEzMTFk" +
        "NzQwMzE8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8" +
        "cmRmOlNlcT4KICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgPHN0" +
        "RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgIDxzdEV2dDppbnN0YW5jZUlE" +
        "PnhtcC5paWQ6NmIyNGUyN2EtY2YwNy00OWQxLTliMGQtNjgxMzExZDc0MDMxPC9zdEV2dDppbnN0" +
        "YW5jZUlEPgogICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAxLTEyVDEyOjI0OjM4LTA2OjAwPC9zdEV2" +
        "dDp3aGVuPgogICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAx" +
        "NSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICA8L3JkZjpsaT4KICAgICA8" +
        "cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZl" +
        "ZDwvc3RFdnQ6YWN0aW9uPgogICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmQ0MWU3OTYx" +
        "LTlkZTEtNDk4MS1hMmE0LWFmODk2Y2JiODY0Mzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgPHN0" +
        "RXZ0OndoZW4+MjAxNi0wMS0xMlQxMjoyNDozOC0wNjowMDwvc3RFdnQ6d2hlbj4KICAgICAgPHN0" +
        "RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCk8L3N0" +
        "RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+" +
        "CiAgICAgPC9yZGY6bGk+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPGRj" +
        "OmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+Mzwv" +
        "cGhvdG9zaG9wOkNvbG9yTW9kZT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94" +
        "OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz5WWPSxAAAAGElEQVRYCWNgYGD4z0BFML0Bw2g4" +
        "DIdDAAC/Vw0hIZqWJQAAAABJRU5ErkJggg=="
      )
    });

    // Create an array of random star positions
    const starsCount = 2000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;     // x
      positions[i + 1] = (Math.random() - 0.5) * 100; // y
      positions[i + 2] = (Math.random() - 0.5) * 100; // z
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Position camera
    camera.position.z = 5;

    // Handle scroll interaction
    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate stars based on scroll position
      stars.rotation.y = scrollY * 0.0005;
      stars.rotation.x = scrollY * 0.0002;

      // Continuous rotation
      stars.rotation.y += 0.0002;

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
      window.removeEventListener('scroll', () => {});
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};