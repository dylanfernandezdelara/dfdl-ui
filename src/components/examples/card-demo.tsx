import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Weekly digest</CardTitle>
        <CardDescription>Sent every Monday at 9:00.</CardDescription>
      </CardHeader>
      <CardContent>A summary of new bills, votes and the members you follow.</CardContent>
      <CardFooter>
        <Button size="sm">Subscribe</Button>
        <Button size="sm" variant="ghost">Preview</Button>
      </CardFooter>
    </Card>
  )
}
