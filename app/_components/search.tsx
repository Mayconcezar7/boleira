import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"


const Search = () => {
  return (
    <div className="flex gap-2 h-8.5">
        <Input placeholder="Digite algo pra pesquisarmos." className="bg-white"/>
        <Button className="bg-amber-500 h-full">
            <SearchIcon />
        </Button>
    </div>
  )
}

export default Search