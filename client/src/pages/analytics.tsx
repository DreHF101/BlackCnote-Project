import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[var(--dark-bg)]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Investment Analytics
          </h1>
          <p className="text-[var(--text-secondary)]">
            Detailed analysis of your investment performance
          </p>
        </div>

        <Card className="bg-[var(--dark-card)] border-[var(--dark-border)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">
              Analytics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <i className="fas fa-chart-bar text-[var(--text-secondary)] text-4xl mb-4"></i>
            <h3 className="text-[var(--text-primary)] text-lg font-semibold mb-2">
              Analytics Coming Soon
            </h3>
            <p className="text-[var(--text-secondary)]">
              Advanced analytics and reporting features will be available here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
