import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpenIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import slangData from "@/data/slangData.json";

// Initial slang dictionary
const mockDictionary = slangData;

const Dictionary = () => {
  const [dictionary, setDictionary] = useState(mockDictionary);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddingTerm, setIsAddingTerm] = useState(false);
  const [editingTermId, setEditingTermId] = useState<number | null>(null);
  const [newTerm, setNewTerm] = useState({
    term: "",
    severity: "medium" as "low" | "medium" | "high",
    category: "",
    definition: "",
    examples: ""
  });

  const categories = ["all", "harmful", "suspicious", "dismissive", "positive", "social_media"];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'review': return 'warning';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  const filteredDictionary = dictionary.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add or Update Term
  const handleAddTerm = () => {
    if (!newTerm.term || !newTerm.definition) return;

    if (editingTermId) {
      // Update existing term
      setDictionary(dictionary.map(item => 
        item.id === editingTermId
          ? { ...item, ...newTerm, examples: newTerm.examples.split(',').map(e => e.trim()) }
          : item
      ));
      setEditingTermId(null);
    } else {
      // Add new term
      const newEntry = {
        ...newTerm,
        id: Date.now(),
        status: 'active',
        dateAdded: new Date().toISOString(),
        examples: newTerm.examples ? newTerm.examples.split(',').map(e => e.trim()) : []
      };
      setDictionary([newEntry, ...dictionary]);
    }

    setNewTerm({ term: "", severity: "medium", category: "", definition: "", examples: "" });
    setIsAddingTerm(false);
  };

  // Delete Term
  const handleDeleteTerm = (id: number) => {
    if (confirm("Are you sure you want to delete this term?")) {
      setDictionary(dictionary.filter(item => item.id !== id));
    }
  };

  // Edit Term
  const handleEditTerm = (entry: typeof newTerm & { id: number; examples: string[] }) => {
    setNewTerm({
      term: entry.term,
      category: entry.category,
      severity: entry.severity,
      definition: entry.definition,
      examples: entry.examples.join(', ')
    });
    setEditingTermId(entry.id);
    setIsAddingTerm(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Slang Dictionary</h1>
            <p className="text-muted-foreground mt-2">
              Manage your dynamic slang and codeword detection database
            </p>
          </div>
          <Button variant="hero" onClick={() => { setIsAddingTerm(true); setEditingTermId(null); }}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Term
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 bg-gradient-card border-border">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search terms, definitions, or examples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Add/Edit Term Modal */}
        {isAddingTerm && (
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">
                {editingTermId ? "Edit Term" : "Add New Term"}
              </h3>
              <Button variant="ghost" onClick={() => setIsAddingTerm(false)}>×</Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Term</Label>
                <Input
                  placeholder="Enter slang term or phrase"
                  value={newTerm.term}
                  onChange={(e) => setNewTerm({ ...newTerm, term: e.target.value })}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Category</Label>
                <Input
                  placeholder="e.g., harmful, suspicious, positive"
                  value={newTerm.category}
                  onChange={(e) => setNewTerm({ ...newTerm, category: e.target.value })}
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Severity</Label>
                <select
                  value={newTerm.severity}
                  onChange={(e) => setNewTerm({ ...newTerm, severity: e.target.value as any })}
                  className="w-full p-2 rounded-md bg-background border border-border text-foreground"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Examples (comma separated)</Label>
                <Input
                  placeholder="Example usage contexts"
                  value={newTerm.examples}
                  onChange={(e) => setNewTerm({ ...newTerm, examples: e.target.value })}
                  className="bg-background"
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label className="text-sm font-medium text-foreground">Definition</Label>
              <Input
                placeholder="Clear definition of the term's meaning and context"
                value={newTerm.definition}
                onChange={(e) => setNewTerm({ ...newTerm, definition: e.target.value })}
                className="bg-background"
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button variant="hero" onClick={handleAddTerm}>
                {editingTermId ? "Update Term" : "Add Term"}
              </Button>
              <Button variant="outline" onClick={() => setIsAddingTerm(false)}>Cancel</Button>
            </div>
          </Card>
        )}

        {/* Dictionary Entries */}
        <div className="space-y-4">
          {filteredDictionary.map((entry) => (
            <Card key={entry.id} className="p-6 bg-gradient-card border-border hover:shadow-primary transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-card-foreground">
                      "{entry.term}"
                    </h3>
                    <Badge variant={getSeverityColor(entry.severity)}>
                      {entry.severity.toUpperCase()}
                    </Badge>
                    <Badge variant={getStatusColor(entry.status)}>
                      {entry.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {entry.category.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {entry.definition}
                  </p>
                  
                  {entry.examples.length > 0 && !entry.examples.includes('Censored') && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Examples:</p>
                      <div className="flex flex-wrap gap-1">
                        {entry.examples.map((example, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            "{example}"
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    Added: {new Date(entry.dateAdded).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="ghost" size="sm" onClick={() => handleEditTerm(entry)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTerm(entry.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDictionary.length === 0 && (
          <Card className="p-12 bg-gradient-card border-border text-center">
            <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              No terms found matching your search criteria
            </p>
          </Card>
        )}

        {filteredDictionary.length > 0 && (
          <div className="text-center py-6">
            <Button variant="outline" size="lg">
              Load More Terms
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dictionary;
