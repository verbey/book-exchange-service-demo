import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { BookCardProps } from "../types/BookCardProps";
import { useCallback } from "react";
import { useNavigate } from "react-router";

function BookCard(props: BookCardProps) {
    const navigate = useNavigate();

    const isClickable = Boolean(props.id);

    const goToDetail = useCallback(() => {
        if (!props.id) return;
        navigate(`/books/${props.id}`);
    }, [navigate, props.id]);

    const onKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!isClickable) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToDetail();
        }
    }, [goToDetail, isClickable]);

    return (
        <Card
            className={`w-full h-96 border border-gray-300 box-border flex flex-col overflow-hidden${isClickable ? ' cursor-pointer' : ''}`}
            onClick={isClickable ? goToDetail : undefined}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={isClickable ? onKeyDown : undefined}
        >
            <CardHeader className="px-4 py-3 flex-none">
                <CardTitle className="break-words">{props.name}</CardTitle>
                <CardDescription>
                    Written by {props.author} in {props.published}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-0 flex-1 min-h-0">
                <img
                    src={props.imageUrl}
                    alt={`Cover of the book ${props.name} by ${props.author}`}
                    className="w-full h-full block object-cover"
                />
            </CardContent>

            <CardFooter className="px-4 py-3 justify-end flex-none">
                <p className="text-sm text-gray-600">{props.pages} pages</p>
            </CardFooter>
        </Card>
    );
}

export default BookCard;