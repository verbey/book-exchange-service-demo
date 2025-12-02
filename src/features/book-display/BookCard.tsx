import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { BookCardProps } from "./types/BookCardProps";

function BookCard(props: BookCardProps) {
    return (
        <Card className="w-72 h-96 border border-gray-300 box-border flex flex-col overflow-hidden">
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