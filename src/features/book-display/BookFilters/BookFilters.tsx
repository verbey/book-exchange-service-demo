import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import useChangeSearchFilters from "./useChangeSearchFilters"

export function BookFilters() {
    const { searchValue, sortValue, onSearchChange, onSortChange } = useChangeSearchFilters()

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search books by name..."
                    className="pl-10"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <Select value={sortValue ?? undefined} onValueChange={(v) => onSortChange(v)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Sort books" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="name">Sort by book title</SelectItem>
                    <SelectItem value="author">Sort by book author</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
