import { SentQuotes } from "@components/freightforwarder/sentQuotes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { baseUrl } from "@/app/config";
import { RequestedQuotesComponent } from "@/components/freightforwarder/requestedQuoteComponent";
import { createAuthorizedAxios } from "@/lib/authHelper";

const page = async () => {
  // const [activeTab, setActiveTab] = useState(0)
  let requestedQuotes = [];
  let sentQuotes = [];
  try {
    const api = await createAuthorizedAxios();
    const requestedQuotesResponse = await api.get(
      `${baseUrl}/freight/freightQuote`
    );
    requestedQuotes = requestedQuotesResponse.data.data;

    const sentQuotesResponse = await api.get(
      `${baseUrl}/freight/freightQuote/sentQuotes`
    );
    sentQuotes = sentQuotesResponse.data.data;

    console.log(requestedQuotes, sentQuotes);
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Freight Quotations</h1>
      <Tabs defaultValue="requested" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-blue-50 ">
          <TabsTrigger value="requested">Requested Quotes</TabsTrigger>
          <TabsTrigger value="sent">Sent Quotes</TabsTrigger>
        </TabsList>
        <TabsContent value="requested">
          <RequestedQuotesComponent requestedQuotes={requestedQuotes} />
        </TabsContent>
        <TabsContent value="sent">
          <SentQuotes sentQuotes={sentQuotes} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default page;
