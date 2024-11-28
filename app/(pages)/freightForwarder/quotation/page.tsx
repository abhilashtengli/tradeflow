import { RequestedQuotes } from "@components/freightforwarder/requestedQuotes";
import { SentQuotes } from "@components/freightforwarder/sentQuotes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { baseUrl } from "@/app/config";

const page = async () => {
  // Remove this line
  // const [activeTab, setActiveTab] = useState(0)
  let requestedQuotes = [];
  let sentQuotes = [];
  try {
    const requestedQuotesResponse = await axios.get(
      `${baseUrl}/freight/freightQuote`
    );
    requestedQuotes = requestedQuotesResponse.data.data;

    const sentQuotesResponse = await axios.get(
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
          <RequestedQuotes requestedQuotes={requestedQuotes} />
        </TabsContent>
        <TabsContent value="sent">
          <SentQuotes sentQuotes={sentQuotes} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default page;
