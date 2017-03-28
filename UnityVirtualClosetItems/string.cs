using UnityEngine;
using System.Collections;

public class ExampleClass : MonoBehaviour {
    void Start() {
         // prints hello
        string s = "hello";
        Debug.Log(s);
 

        // prints hello world
        s = string.Format("{0} {1}", s, "world");
        Debug.Log(s);

        // prints helloworld
        s = string.Concat("hello", "world");
        Debug.Log(s);

        // prints HELLOWORLD
        s = s.ToUpper();
        Debug.Log(s);

        // prints helloworld
        s = s.ToLower();
        Debug.Log(s);

        // prints 'e'
        Debug.Log(s[1]);

        // prints 42
        int i = 42;
        s = i.ToString();
        Debug.Log(s);

        // prints -43
        s = "-43";
        i = int.Parse(s);
        Debug.Log(i);

        // prints 3.141593 (an approximation)
        float f = 3.14159265359F;
        s = f.ToString();
        Debug.Log(s);

        // prints -7.141593 (an approximation)
        s = "-7.14159265358979";
        f = float.Parse(s);
        Debug.Log(f);
    }
}
