// C# array length example
using UnityEngine;
using System.Collections;

public class ExampleClass : MonoBehaviour {
    void Start() {
    
        // use string array approach
        string[] names = new string[]{"Hello", "World", "Really"};
        
        foreach (string s in names) {
            print("user is: " + s);
        }
        
        print("length is: " + names.Length);
        
        // use ArrayList approach
        ArrayList arr = new ArrayList();
        arr.Add("Hello");
        arr.Add("World");

        // ArrayList uses Count instead of Length
        print(arr.Count);
    }
}
