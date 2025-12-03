import { FooterContent } from "./footer";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <p>&copy; 2024 Demo App</p>
        <div className="flex gap-2">
          <FooterContent.Slot />
        </div>
      </div>
    </footer>
  );
}
