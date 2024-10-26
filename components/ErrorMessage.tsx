import { IoAlertCircleOutline } from 'react-icons/io5';
import { Button } from './ui/button';

interface Props {
    message: string;
    reset?: () => void;
}

const ErrorMessage = ({ reset }: Props) => {
    return (
        <div className="container">
            <div className="max-w-[500px] mx-auto flex flex-col items-center text-center">
                <IoAlertCircleOutline className="h-20 w-20 text-rose-500" />

                <h1 className="text-xl mt-4 mb-2">Some thing went wrong!</h1>
                <p>
                    Please try again later. If the problem persists, please
                    contact support.
                </p>
                <Button variant="outline" className="mt-4" onClick={reset}>
                    Try again
                </Button>
            </div>
        </div>
    );
};

export default ErrorMessage;
