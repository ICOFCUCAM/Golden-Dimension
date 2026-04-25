import React from 'react';
import {
  Calculator, Palette, Wrench, GraduationCap, Leaf, TrendingUp,
  Heart, Stethoscope, Scale, Megaphone, Code, Radio, Truck,
  Umbrella, Globe, PenTool,
  // Extended icons used by the upgraded Services page sections
  Compass, Cpu, Settings2, Landmark, Building2, ShieldCheck,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator, Palette, Wrench, GraduationCap, Leaf, TrendingUp,
  Heart, Stethoscope, Scale, Megaphone, Code, Radio, Truck,
  Umbrella, Globe, PenTool,
  Compass, Cpu, Settings2, Landmark, Building2, ShieldCheck,
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
