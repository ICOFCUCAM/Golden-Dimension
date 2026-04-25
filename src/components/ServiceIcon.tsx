import React from 'react';
import {
  Calculator, Palette, Wrench, GraduationCap, Leaf, TrendingUp,
  Heart, Stethoscope, Scale, Megaphone, Code, Radio, Truck,
  Umbrella, Globe, PenTool
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator, Palette, Wrench, GraduationCap, Leaf, TrendingUp,
  Heart, Stethoscope, Scale, Megaphone, Code, Radio, Truck,
  Umbrella, Globe, PenTool
};

interface ServiceIconProps {
  icon: string;
  size?: number;
  className?: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ icon, size = 24, className = '' }) => {
  const IconComponent = iconMap[icon];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
};

export default ServiceIcon;
