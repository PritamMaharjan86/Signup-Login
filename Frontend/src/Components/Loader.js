import { FlapperSpinner } from "react-spinners-kit";

export default function Loader() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-20">
            <FlapperSpinner size={50} color="#3B82F6" />
        </div>
    );
}