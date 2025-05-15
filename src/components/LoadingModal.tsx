import LoadingSpinner from "./LoadingSpinner";

// LoadingModal.tsx
type LoadingModalProps = {
    isOpen: boolean;
};
  
export default function LoadingModal({ isOpen }: LoadingModalProps) {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50">
            <LoadingSpinner />
        </div>
    );
}
  