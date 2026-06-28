import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
  variant?: "header" | "footer";
};

export function BrandLogo({ priority = false, variant = "header" }: BrandLogoProps) {
  return (
    <Image
      className={`brand-logo brand-logo-${variant}`}
      src={variant === "footer" ? "/brand/toys-logo-footer.png" : "/brand/toys-logo-cropped.png"}
      alt="Toys"
      width={1238}
      height={255}
      sizes={variant === "footer" ? "(max-width: 720px) 176px, 272px" : "(max-width: 720px) 176px, 240px"}
      priority={priority}
    />
  );
}
