import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BoardGameCategory, BoardGameItem } from "@/components/table/columns";
import { Config } from "@/components/config";
import axios from "axios";

export function CarouselPlugin({ props }: { props: BoardGameItem[] }) {
  const [category, setCategory] = React.useState<BoardGameCategory[]>([]);

  function formatPrice(price: string) {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(parseFloat(price));
  }

  async function fetchCategory(): Promise<BoardGameCategory[]> {
    try {
      const response = await axios.get(Config.apiPath + "/game/category/list");
      setCategory(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const categoryMap = (id: string) => {
    return category.find((cat) => cat.id === id)?.name;
  };

  React.useEffect(() => {
    fetchCategory();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-sm md:max-w-2xl lg:max-w-4xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      orientation="horizontal"
    >
      <CarouselContent className="-ml-1 md:-ml-2 lg:-ml-4">
        {props?.map((prop, index) => (
          <CarouselItem
            key={index}
            className="basis-4/5 pl-1 md:basis-1/3 md:pl-2 lg:pl-4"
          >
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-1 text-xl">
                    {prop.name}
                  </CardTitle>
                  <CardDescription>{prop.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex aspect-square items-start justify-start p-6">
                  <div className="grid gap-3">
                    <div className="font-semibold">Details</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center gap-x-2">
                        <span className="text-muted-foreground">Players:</span>
                        <span>
                          {prop.minPlayers}-{prop.maxPlayers}
                        </span>
                      </li>
                      <li className="flex items-center gap-x-2">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{prop.duration} minutes</span>
                      </li>
                      <li className="flex items-center gap-x-2">
                        <span className="text-muted-foreground">
                          Difficulty:
                        </span>
                        <span>Level {prop.difficulty}</span>
                      </li>
                      <li className="flex items-center gap-x-2">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{categoryMap(prop.boardGame_CategoryId)}</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <span>฿{prop.price}</span>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden sm:flex">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
