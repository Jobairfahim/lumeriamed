import Image from "next/image";
import { MapPin, Clock, Languages } from "lucide-react";
import { Placement } from "@/lib/types";
import { formatFee, cn } from "@/lib/utils";
import Badge from "./Badge";
import Button from "./Button";

interface PlacementCardProps {
  placement: Placement;
  className?: string;
}

export default function PlacementCard({ placement, className }: PlacementCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-cardHover transition-all duration-300 hover:-translate-y-1 flex flex-col",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={placement.imageUrl}
          alt={placement.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge label={placement.specialty} variant="navy" />
        </div>
        {placement.spotsAvailable <= 3 && (
          <div className="absolute bottom-3 left-3">
            <Badge label={`${placement.spotsAvailable} spot${placement.spotsAvailable === 1 ? "" : "s"} left`} variant="warning" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-display font-semibold text-brand-navy text-lg leading-snug">
            {placement.title}
          </h3>
          <p className="text-brand-teal text-sm font-medium mt-0.5">{placement.hospital}</p>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 text-xs text-brand-slate">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-brand-teal" />
            {placement.city}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-brand-teal" />
            {placement.duration}
          </span>
          <span className="flex items-center gap-1">
            <Languages size={12} className="text-brand-teal" />
            {placement.language}
          </span>
        </div>

        <p className="text-brand-slate text-sm leading-relaxed flex-1 line-clamp-3">
          {placement.description}
        </p>

        {/* Tags */}
        {placement.tags && placement.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {placement.tags.map((tag) => (
              <Badge key={tag} label={tag} variant="light" />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-brand-border mt-auto">
          <span className="text-brand-navy font-semibold text-sm">
            {formatFee(placement.fee)}
          </span>
          <Button href={`/browse-placements/${placement.id}`} size="sm">
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
}
