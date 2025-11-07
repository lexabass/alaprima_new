export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-6">
      <div className="container mx-auto text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Art Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
}
