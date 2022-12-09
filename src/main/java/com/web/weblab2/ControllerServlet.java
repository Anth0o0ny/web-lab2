package com.web.weblab2;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;


        import com.google.gson.Gson;
        import com.google.gson.GsonBuilder;
        import javax.servlet.ServletException;
        import javax.servlet.annotation.WebServlet;
        import javax.servlet.http.HttpServlet;
        import javax.servlet.http.HttpServletResponse;
        import java.io.IOException;
        import java.util.ArrayList;

/**
 * Определяет тип запроса, и, в зависимости от того, содержит ли запрос информацию о координатах точки и радиусе,
 * делегирует его обработку одному из компонентов: AreaCheckServlet/Страница JSP.
 * Все запросы внутри приложения должны передаваться этому сервлету (по методу GET или POST в зависимости от варианта
 * задания), остальные сервлеты с веб-страниц напрямую вызываться не должны.
 * */
@WebServlet(name = "controllerServlet", value = "/controller-servlet")
public class ControllerServlet extends HttpServlet {

    private final Gson gsonInterpreter = new GsonBuilder().setPrettyPrinting().create();

    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
        if (req.getSession().getAttribute("hits") == null) {
            req.getSession().setAttribute("hits", new ArrayList<String>());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        PrintWriter out = res.getWriter();
        out.write(gsonInterpreter.toJson(req.getSession().getAttribute("hits")));
        out.close();
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");

        final String xCoordinate = request.getParameter("xCoordinate");
        final String yCoordinate = request.getParameter("yCoordinate");
        final String radius = request.getParameter("radius");


        request.getRequestDispatcher("/area-check-servlet").forward(request, response);


    }

    public void destroy() {
    }
}

