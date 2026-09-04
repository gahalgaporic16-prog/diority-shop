import { notFound } from "next/navigation";

// Страница отзывов отключена. Файл оставлен на случай восстановления.
// Чтобы удалить полностью — снеси папку src/app/reviews целиком в проводнике.
export default function ReviewsDisabled() {
  notFound();
}
