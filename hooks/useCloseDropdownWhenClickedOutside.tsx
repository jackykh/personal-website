import { useEffect } from "react";

const useCloseDropdownWhenClickedOutside = (
  ref: React.RefObject<HTMLElement>,
  onClose: (clickedItem: Node) => void
) => {
  useEffect(() => {
    /**
     * close the dropdown if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      const clickedItem = event.target as Node;
      if (ref.current && !ref.current.contains(clickedItem)) {
        onClose(clickedItem);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useCloseDropdownWhenClickedOutside;
