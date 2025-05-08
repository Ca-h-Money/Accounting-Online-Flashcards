// LoadingModal.tsx
type LoadingModalProps = {
    isOpen: boolean;
};
  
export default function LoadingModal({ isOpen }: LoadingModalProps) {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-white"></div>
        </div>
    );
}
  