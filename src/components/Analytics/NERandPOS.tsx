import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Card, { CardContent } from "../Card";
import { Button } from "../ui/button";
import NERHighlight from "./NERHighlight";
import POSTagging from "./POSTagging";

const NERandPOS = ({ nerEntities, posTokens }: any) => {
  const [selectedNER, setSelectedNER] = useState(null);
  const [selectedPOS, setSelectedPOS] = useState(null);

  const handleNERClick = (entityType: any) => {
    setSelectedNER(entityType);
    setSelectedPOS(null);
  };

  const handlePOSClick = (posType: any) => {
    setSelectedPOS(posType);
    setSelectedNER(null);
  };

  return (
    <section className="grid w-full grid-cols-1 gap-4 transition-all sm:grid-cols-2 lg:grid-cols-3">
      <CardContent>
        <Tabs defaultValue="NER">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="NER">NER</TabsTrigger>
            <TabsTrigger value="POS">Parts of Speech</TabsTrigger>
          </TabsList>
          <TabsContent value="NER">
            <div className="flex flex-col justify-around items-center gap-2">
              <Button
                className="bg-chart1"
                onClick={() => handleNERClick("PERSON")}
              >
                Person
              </Button>
              <Button
                className="bg-chart2"
                onClick={() => handleNERClick("ORGANIZATION")}
              >
                Organization
              </Button>
              <Button
                className="bg-chart3"
                onClick={() => handleNERClick("LOCATION")}
              >
                Location
              </Button>
              <Button
                className="bg-chart4"
                onClick={() => handleNERClick("DATE")}
              >
                Date
              </Button>
              <Button
                className="bg-chart5"
                onClick={() => handleNERClick("OTHER")}
              >
                Other
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="POS">
            <div className="flex flex-col justify-around items-center gap-2">
              <Button
                className="bg-chart1"
                onClick={() => handlePOSClick("NOUN")}
              >
                Noun
              </Button>
              <Button
                className="bg-chart2"
                onClick={() => handlePOSClick("VERB")}
              >
                Verb
              </Button>
              <Button
                className="bg-chart3"
                onClick={() => handlePOSClick("ADJ")}
              >
                Adjective
              </Button>
              <Button
                className="bg-chart4"
                onClick={() => handlePOSClick("ADV")}
              >
                Adverb
              </Button>
              <Button
                className="bg-chart5"
                onClick={() => handlePOSClick("PRON")}
              >
                Pronoun
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <div className="relative flex h-[60vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-hidden">
        <Badge variant="outline" className="absolute right-3 top-3">
          {selectedNER
            ? "NER Highlighting"
            : selectedPOS
            ? "POS Highlighting"
            : "Highlighting"}
        </Badge>
        <div className="mt-5 h-full overflow-scroll no-scrollbar">
          {selectedNER ? (
            <NERHighlight entities={nerEntities} highlightType={selectedNER} />
          ) : null}
          {selectedPOS ? (
            <POSTagging tokens={posTokens} highlightType={selectedPOS} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default NERandPOS;
