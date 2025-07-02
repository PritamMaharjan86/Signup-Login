import { GooSpinner } from "react-spinners-kit";

export default function Loader() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-20">
            <GooSpinner size={50} color="#facc15" />
        </div>
    );
}