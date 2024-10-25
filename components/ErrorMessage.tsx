import { IoAlertCircleOutline } from 'react-icons/io5';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="container">
            <Alert variant="destructive" className="max-w-[500px] mx-auto">
                <IoAlertCircleOutline className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </div>
    );
};

export default ErrorMessage;
