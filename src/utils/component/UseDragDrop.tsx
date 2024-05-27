// useDragAndDrop.ts
import { useEffect, useRef, useCallback } from 'react';
import styles from '/src/components/Module/Home.module.css'; 

interface DragEvents {
  onDragStart: (event: DragEvent) => void;
  onDragOver: (event: DragEvent) => void;
  onDragEnd: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
}


const useDragAndDrop = (
  onDragStart: (event: DragEvent) => void,
  onDragOver: (event: DragEvent) => void,
  onDragEnd: (event: DragEvent) => void,
  onDrop: (event: DragEvent) => void
) => {
  const dragRef = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    const element = dragRef.current;
    if(!element) return;

    element.addEventListener('dragenter', (e) => {
      element.classList.add(styles.active)
    })

    element.addEventListener('dragleave', () => {
      element.classList.remove(styles.active)
    })
  }, [])

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', onDragStart);
      dragRef.current.addEventListener('dragover', onDragOver);
      dragRef.current.addEventListener('dragleave', onDragEnd);
      dragRef.current.addEventListener('drop', onDrop);
    }
  }, [onDragStart, onDragOver, onDragEnd, onDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', onDragStart);
      dragRef.current.removeEventListener('dragover', onDragOver);
      dragRef.current.removeEventListener('dragleave', onDragEnd);
      dragRef.current.removeEventListener('drop', onDrop);
    }
  }, [onDragStart, onDragOver, onDragEnd, onDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return {
    dragRef,
  };
};

export default useDragAndDrop;
