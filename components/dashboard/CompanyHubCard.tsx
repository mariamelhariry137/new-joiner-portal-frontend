import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CompanyHubCard() {
  return (
    <Link href="/company">
      <Card className="shadow-sm transition-colors hover:bg-accent/50">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground" />

            <div>
              <p className="text-sm font-medium">Company hub</p>
              <p className="text-xs text-muted-foreground">
                Teams, contacts, policies, resources
              </p>
            </div>
          </div>

          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}