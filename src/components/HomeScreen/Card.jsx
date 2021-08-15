import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({ icon, text, onClick = () => {} }) {
    return (
        <div className="bg-gray-600 text-gray-200 w-full p-4 transform duration-300 rounded-sm cursor-pointer hover:-translate-y-1" onClick={onClick}>
            <div className="flex space-x-6">
                <p className="text-6xl">
                    <FontAwesomeIcon icon={icon} />
                </p>
                <h1 className="text-3xl my-auto">{text}</h1>
            </div>
        </div>
    );
}
